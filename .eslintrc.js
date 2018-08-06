module.exports = {
    "extends": "Airbnb",
    "env": {
	    "browser" : true
    },
    "rules": {
        "no-underscore-dangle": [
            "error",
            { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }
        ]
    }
};
