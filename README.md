# Archived

This software is now archived and unmaintained.

See https://github.com/langalex/ramit2 for version 2, which is a complete rewrite using Svete and PouchDB.

### About

Ramit is a personal accounting app inspried by the book 'I will teach you to be rich' by Ramit Sethi.

It is based on the idea that for each area of spending you preload an account with money and only spend as much of it as you have in that account.

### Running it

This is a standalone, offline HTML5 app, just open `index.html` in a browser.

The official version is hosted at http://ramit.5apps.com.

### Deployment

Build the app with `ember build --environment production`. Deploy the `dist` directory:

    git push <deploy remote> `git subtree split --prefix dist master`:master --force

### Acknowledgements

Icons by [Glyphicons](http://glyphicons.com/)
