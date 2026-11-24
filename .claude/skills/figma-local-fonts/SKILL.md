---
name: figma-local-fonts
description: Use whenever writing or editing text in Figma through the Figma MCP (`use_figma`) and the font the design calls for is not available server-side — a brand, licensed, or otherwise locally installed font. Sets text in a stand-in font and tags it so the user's "Local fonts bridge" Figma plugin switches it to the real local font automatically. Load alongside figma-use.
---

# Designing in Figma with the user's local fonts

`use_figma` runs on Figma's servers, which only have Figma's built-in fonts.
Fonts installed on the user's computer cannot be loaded there. The user has a
Figma plugin, **Local fonts bridge** (plugin id
`9ea0b62e-8a3f-4133-bf3a-45e3f7c5e7f5`, owned by their Personal team), that
runs in their own Figma, sees their local fonts, and swaps tagged text to the
real font. While its panel is open it applies tags on the current page every
three seconds, with no clicks.

All communication goes through shared plugin data in the `local_fonts`
namespace. `setSharedPluginData` works in `use_figma`; `setPluginData` does not.

| Where | Key | Value | Written by |
| --- | --- | --- | --- |
| `figma.root` | `inventory` | `{"v":1,"truncated":false,"families":{"<family>":["<style>",…]}}` — every font installed locally that the server lacks, with exact style names | plugin |
| `figma.root` | `server_families` | `["<family>",…]` — families the server has | you |
| text layer or local text style | `font` | `{"family":"…","style":"…"}` and/or `{"ranges":[{"start":0,"end":5,"family":"…","style":"…"}]}` | you |
| text layer | `standin` | the font the layer had before the plugin swapped it | plugin |

## Workflow

Do this without asking the user; it is the default whenever a font is missing.

1. **Find the font the design calls for** from the source (CSS, tokens, brand
   guide, the user's words). Do not silently substitute.
2. **Check the server first.** If `figma.listAvailableFontsAsync()` has the
   family, use it normally and stop here.
3. **Check the local inventory.** Read
   `figma.root.getSharedPluginData('local_fonts', 'inventory')` and look the
   family up, ignoring case and spacing. Use the exact family and style
   strings it lists. Map CSS weights to the styles that exist: 300 Light,
   400 Regular, 500 Medium, 600 Semi Bold, 700 Bold, plus Italic.
4. **Record the server's fonts** if `server_families` is empty on the root:
   write the sorted, de-duplicated family names from
   `listAvailableFontsAsync()` as a JSON array. The plugin uses it to work out
   which local fonts to share, and remembers it for the user's other files.
5. **Set the text in a stand-in font and tag it.** Pick a server font of the
   same class and similar proportions (a serif for a serif), in the matching
   weight and slant, so layout is close before the swap. Then tag:

   ```js
   const standin = { family: 'Source Serif 4', style: 'Medium' };
   await figma.loadFontAsync(standin);
   const t = figma.createText();
   t.fontName = standin;
   t.characters = 'Headline';
   t.setSharedPluginData('local_fonts', 'font',
     JSON.stringify({ family: 'Flecha M', style: 'Medium' }));
   ```

   For mixed styling in one layer, add `ranges` with character offsets
   computed from the text (`characters.indexOf(phrase)`), not counted by hand.
   When using local text styles, tag the style the same way (family and style
   only) so the whole style switches.
6. **Verify.** Wait a few seconds, then read the tagged layers back:
   `node.fontName` should be the local font and `node.hasMissingFont` will be
   `true` server-side, which is expected. Screenshots do render the applied
   local font, so take one to check for wrapping or overflow caused by the
   swap, and fix layout if needed.

## When the font is not in the inventory

- **Inventory empty:** the plugin has not been opened in this file. Tag the
  text anyway, using the family name from the source and standard style names,
  and tell the user to open Local fonts bridge from the **Tools** tab (Source:
  Created by you) and leave the panel open. Tags apply as soon as it runs.
- **Inventory present but family absent:** the font is not installed on that
  computer, or the name differs. Say so, list close matches from the
  inventory, and ask which to use.
- **Layers still on the stand-in after several seconds:** the panel is closed,
  the user is on a different page, or the tag failed (the panel lists
  failures). Tell the user which.

## Editing text that already uses a local font

The server cannot load the local font, so changing `characters` directly
throws. Switch to the stand-in, edit, and leave the tag in place; the plugin
re-applies the local font on its own:

```js
const standin = JSON.parse(node.getSharedPluginData('local_fonts', 'standin') || 'null')
  ?? { family: 'Source Serif 4', style: 'Regular' };
await figma.loadFontAsync({ family: standin.family, style: standin.style });
node.fontName = { family: standin.family, style: standin.style };
node.characters = 'New wording';
```

Appending to, moving, or restyling frames that contain local-font text works
without this step.

## Limits to tell the user about when relevant

- The plugin must be open in the file; a Figma plugin cannot run in the
  background. Automatic applying covers the page the user is viewing.
- Collaborators without the font installed see Figma's missing-font warning.
- The inventory stores the names of the user's local-only fonts in the file.
