
var validator = require(__dirname + '/../validator');

module.exports = {

    options: {

        listId: {
            required: true,
            assert: validator.coercePositiveInteger
        },
        createdFrom: {
            required: true,
            assert: validator.coercePositiveInteger
        },
        updateIfFound: {
            required: true
        },
        columns: {
            required: false,
            assert: validator.assertScalarHash
        }

    },

    generator: function(options) {

        var subnode, key;

        var params = {
            "LIST_ID": options.listId,
            "CREATED_FROM": options.createdFrom,
            "UPDATE_IF_FOUND": options.updateIfFound
        };



        if (typeof options.columns !== 'undefined') {
            subnode = [];
            for (key in options.columns) {
                subnode.push({
                    NAME: key,
                    VALUE: options.columns[key]
                });
            }
            params["COLUMN"] = subnode;
        }


        return params;
    },

    result: {
        "SUCCESS": {
            rename: 'success',
            require: true
        },
        "RecipientId": {
            rename: 'recipientId',
            require: true,
            assert: validator.coerceIntegerOrString
        },
        "ORGANIZATION_ID": {
            rename: 'organizationId',
            require: true,
            assert: validator.coerceString
        }
    }
};

