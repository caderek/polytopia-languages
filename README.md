# User-made translations for Polytopia

## How to use custom translation?

You can find links to all available translations [here](https://polytopia.netlify.app/).

In Polytopia, open advanced settings, select "Custom..." language and paste the url to the language file.

## How to contribute?

There are couple ways to contribute, you can make a pull request, open an issue to improve existing translation or, if you don't know how to use Github, you can sand me your translation via a form at [polytopia.netlify.app](https://polytopia.netlify.app/).

## Adding new translation

1. Get the template file from here: [empty template](https://raw.githubusercontent.com/caderek/polytopia-languages/master/template.json)

1. Add your new template to the `templates` folder, name it as `<LANG_SHORTCUT>.json` (for example `es.json`). Here's direct link to add a new file -> [ADD NEW TRANSLATION FILE](https://github.com/caderek/polytopia-languages/new/master/templates)

1. Make a pull request - if everything is ok it will be merged and automatically deployed on [polytopia.netlify.com](https://polytopia.netlify.com/).

_Note: Do not edit files in the `translations` folder - they are generated automatically from templates._

## Improving existing translation

1. Open selected template from the ones listed [here](https://github.com/caderek/polytopia-languages/tree/master/templates)

1. Click `Edit this file` button (a pen icon) and add your changes.

1. Make a pull request - if everything is ok it will be merged and automatically deployed on [polytopia.netlify.app](https://polytopia.netlify.app/).

## Structure of the template file

```json
{
  "language": "Your language original name goes here.",
  "author": "Your name/nick goes here (optional)",
  "editors": "If you are editing existing translation, add your name/nick here.",
  "text": {
    "some.key.do.not.edit": {
      "en": "Original text, do not edit.",
      "->": "Here goes your translation, if you leave it empty, original text will be used."
    },
    "some.other.key.do.not.edit": {
      "en": "Another original text, do not edit.",
      "->": "Here goes your translation."
    }
  }
}
```

Example:

```json
{
  "language": "Español",
  "author": "Rafael Nadal",
  "editors": "Fernando Alonso, Iker Casillas",
  "text": {
    "action.info.breakice": {
      "en": "Break Ice",
      "->": "Romper Hielo"
    },
    "action.info.breakpeace": {
      "en": "Break Peace",
      "->": ""
    },
    "action.info.build": {
      "en": "build a {0} here",
      "->": "construir {0} aquí"
    }
  }
}
```

## License

Project is under open, non-restrictive [ISC license](LICENSE.md).
