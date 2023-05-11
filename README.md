# Vibrant Ink Redux

A [Pulsar][pulsar] theme (should also work in [Atom][atom]). Ported from the original for [TextMate 2][textmate].

<img width="530" alt="Screenshot 2023-05-11 at 3 47 04 PM" src="https://user-images.githubusercontent.com/3450/237828531-4ad62496-7df9-40f8-9040-82a30b8d5b74.png">

---

Vibrant Ink Redux is based on Justin Palmer's original [Vibrant Ink theme][original], though I’ve applied 15 years’ worth of customizations.

This theme tries to be logical and ordered, except where it isn't. Some of the style rules are the way they are _only_ because they "look right" to me. You are encouraged to apply your own style overrides in your `styles.less` file or in a fork of this package.

## Configuration

In many subtle ways, Pulsar/Atom expects that you’ll pair a dark syntax theme with a dark UI theme. Vibrant Ink Redux is a dark syntax theme, but if you use it with a light UI theme, you may notice that certain things don’t look great.

There are three configuration options in this package, all disabled by default, that can be useful if you use this theme with a light UI theme.

**Manage Editor Scrollbars**, if checked, will apply dark styling to editor scroll bars, as depicted in the screenshot above. It won’t touch any non-editor scroll bars in the UI.

**Use Bracket Matcher Styles**, if checked, will apply custom editor styles for the built-in `bracket-matcher` package. The default styles for `bracket-matcher` underline paired delimiters using a color defined by your UI theme — a color that may or may not look good in your dark syntax theme. Instead, Vibrant Ink Redux will apply a subtle outline and background-color change to any paired delimiters, as depicted in the screenshot above.

**Use Linter Styles**, if checked, will apply custom editor styles that override styles in `linter-ui-default`. The text styles that `linter-ui-default` uses to decorate errors and warnings in your editor use colors defined by your UI theme that may or may not look good in your dark syntax theme. Instead, Vibrant Ink Redux will use error and warning colors that work better with the editor theme, as depicted in the screenshot above. It’ll also use a simpler underline decoration instead of the “squiggle” style of underline.

[atom]: https://atom.io
[pulsar]: https://pulsar-edit.dev
[textmate]: https://github.com/textmate/textmate
[original]: https://web.archive.org/web/20130122014102/http://alternateidea.com/blog/articles/2006/1/3/textmate-vibrant-ink-theme-and-prototype-bundle
