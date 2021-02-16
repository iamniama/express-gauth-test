# express-gauth-test
This project was used for testing authentication with Google OAuth2 and the Quill rich text editor control.

## Google Authentication
- Based on a tutorial: [TUTORIAL](https://dev.to/phyllis_yym/beginner-s-guide-to-google-oauth-with-passport-js-2gh4)
- There are **LOADS** of bad/outdated tutorials out there...
- Note the 'isLoggedIn' middleware and ppConfig.js, where the magick happens
- This also implements a user permission level (user_level in the user model)
    - This allows multiple levels of user access,
    - and the ability to show different content based on whether a user is logged in or not 
        - AND based on the user's access level
        - refer to index.ejs for an example implementation (the EVERYONE, AUTHONLY, and LEVEL3ONLY divs in index, and the user being packaged and sent down in the '/' route in index.ejs)


## Quill
- Free rich text editor, alternative to TinyMCE and others
- [Quill](quilljs.com)
- I followed the quickstart instructions, with a bit of styling on the div that I used
- Implementation was a little tricky
    - HTML forms don't see it
    - So I had to add a bit of jQuery voodoo
        - in index.ejs
- 
