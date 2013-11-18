/*!
* Project:   The M-Project - Mobile HTML5 Application Framework
* Version:   2.0.0-1
* Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
* Date:      Mon Nov 18 2013 11:30:34
* License:   Dual licensed under the MIT or GPL Version 2 licenses.
*            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
*            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
*/

(function (global, Backbone, _, $) {

    
    /**
     * Defines the general namespace
     *
     * @type {Object}
     */
    var M = null;
    if( typeof exports !== 'undefined' ) {
        M = exports;
    } else {
        M = global.M = {};
    }
    
    /**
     * Version number of current release
     * @type {String}
     */
    M.Version = M.version = '2.0';
    
    /**
     * Empty function to be used when
     * no functionality is needed
     *
     * @type {Function}
     */
    M.f = function() {
    };
    
    M.create = function( args ) {
        return new this(args);
    };
    
    M.design = function( obj ) {
        var O = this.extend(obj || {});
        return new O();
    };
    
    M.extend = Backbone.Model.extend;
    
    M.isCollection = function( collection ) {
        return Backbone.Collection.prototype.isPrototypeOf(collection);
    };
    
    M.isModel = function( model ) {
        return Backbone.Model.prototype.isPrototypeOf(model);
    };
    
    M.isEntity = function( entity ) {
        return M.Entity.prototype.isPrototypeOf(entity);
    };
    
    M.isI18NItem = function( entity ) {
        return (entity && entity._type && entity._type === 'M.I18NItem');
    };
    
    /**
     *
     * Check if the given object is a M.View
     * @param {Object} Check this property if it inherits from M.View
     * @returns {boolean}
     */
    M.isView = function( view ) {
        return M.View.prototype.isPrototypeOf(view);
    };
    
    /**
     * Extend a function with the given interfaces
     * @param interfaces
     * @returns {M}
     */
    M.implements = function( interfaces ) {
        this.prototype._implementedInterfaces = interfaces;
        return this;
    };
    
    
    /**
     * Readable alias for true
     *
     * @type {Boolean}
     */
    YES = true;
    
    /**
     * Readable alias for false
     *
     * @type {Boolean}
     */
    NO = false;
    
    /**
     * @class
     *
     * M.CONST defines constants used all over the framework.
     *
     */
    
    M.CONST = {
    
        LOGGER: {
            /**
             * Tag for all core framework related log messages
             * @type String
             */
            TAG_FRAMEWORK_CORE: 'framework-core',
    
            /**
             * Tag for all data related log messages
             * @type String
             */
            TAG_FRAMEWORK_DATA: 'framework-data',
    
            /**
             * Tag for all UI related log messages
             * @type String
             */
            TAG_FRAMEWORK_UI: 'framework-ui',
    
            /**
             * Tag for all utility related log messages
             * @type String
             */
            TAG_FRAMEWORK_UTILITY: 'framework-utility',
    
            /**
             * Tag for messages that should be shown always
             * @type String
             */
            TAG_ALL: ''
        },
    
        I18N: {
            LOCALE_CHANGED: 'locale-changed'
        },
    
        /***
         * Data type Constants.
         */
        TYPE: {
            INTEGER:    'integer',
    
            STRING:     'string',
    
            TEXT:       'text',
    
            DATE:       'date',
    
            BOOLEAN:    'boolean',
    
            FLOAT:      'float',
    
            OBJECT:     'object',
    
            ARRAY:      'array',
    
            BINARY:     'binary',
    
            OBJECTID:   'objectid',
    
            NULL:       'null'
        },
    
        /***
         * Sorting orders:
         * ASC: Ascending
         * DESC: Descending
         */
        ORDER: {
            ASC: 'ASC',
            DESC: 'DESC'
        },
    
        /***
         * Error Constants.
         *
         * 0-99:    general errors
         *
         * 100-199: Model and Validation errors
         *
         * 200-299:   WebSQL errors
         *
         * 300-400:   CouchDB errors
         *
         * M.CONST.ERROR.UNDEFINED                      0       The reason for the error could not be clarified.
         * M.CONST.ERROR.CONNECTION                     1       A connection to an external service could not be established
         *
         * M.CONST.ERROR.VALIDATION_PRESENCE            100     A model record failed validation due to a property is not set but required to be.
         * M.CONST.ERROR.VALIDATION_URL                 101     A model record failed validation due to a property does not represent a valid URL but is required to do so.
         * M.CONST.ERROR.VALIDATION_PHONE               102     A model record failed validation due to a property does not represent a phone number but is required to do so.
         * M.CONST.ERROR.VALIDATION_NUMBER              103     A model record failed validation due to a property is not of type number or represents a number but is required to do so.
         * M.CONST.ERROR.VALIDATION_NOTMINUS            104     A model record failed validation due to a property contains a minus value but it is required to do not.
         * M.CONST.ERROR.VALIDATION_EMAIL               105     A model record failed validation due to a property does not represent a valid eMail but is required to do so.
         * M.CONST.ERROR.VALIDATION_DATE                106     A model record failed validation due to a property does not represent a valid date but is required to do so.
         *
         * M.CONST.ERROR.MODEL_PROVIDER_NOT_SET         120     A data provider has not been set.
         *
         * M.CONST.ERROR.WEBSQL_UNKNOWN                200     The transaction failed for reasons unrelated to the database itself and not covered by any other error code.
         * M.CONST.ERROR.WEBSQL_DATABASE                201     The statement failed for database reasons not covered by any other error code.
         * M.CONST.ERROR.WEBSQL_VERSION                 202     The operation failed because the actual database version was not what it should be. For example, a statement found that the actual database version no longer matched the expected version of the Database or DatabaseSync object, or the Database.changeVersion() or DatabaseSync.changeVersion() methods were passed a version that doesn't match the actual database version.
         * M.CONST.ERROR.WEBSQL_TOO_LARGE               203     The statement failed because the data returned from the database was too large. The SQL 'LIMIT' modifier might be useful to reduce the size of the result set.
         * M.CONST.ERROR.WEBSQL_QUOTA                   204     The statement failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database.
         * M.CONST.ERROR.WEBSQL_SYNTAX                  205     The statement failed because of a syntax error, or the number of arguments did not match the number of ? placeholders in the statement, or the statement tried to use a statement that is not allowed, such as BEGIN, COMMIT, or ROLLBACK, or the statement tried to use a verb that could modify the database but the transaction was read-only.
         * M.CONST.ERROR.WEBSQL_CONSTRAINT              206     An INSERT, UPDATE, or REPLACE statement failed due to a constraint failure. For example, because a row was being inserted and the value given for the primary key column duplicated the value of an existing row.
         * M.CONST.ERROR.WEBSQL_TIMEOUT                 207     A lock for the transaction could not be obtained in a reasonable time.
         * M.CONST.ERROR.WEBSQL_PROVIDER_NO_DBHANDLER   208     No DBHandler, initialization did not take place or failed.
         * M.CONST.ERROR.WEBSQL_BULK_NO_RECORDS         210     No Records given for bulk transaction
         *
         * M.CONST.ERROR.COUCHDB_CONFLICT               300     A conflict occured while saving a document in CouchDB, propably caused by duplicate IDs
         * M.CONST.ERROR.COUCHDB_DBNOTFOUND             301     The provided database could not be found.
         * M.CONST.ERROR.COUCHDB_DBEXISTS               302     The db already exists and therefor cannot be created again.
         * M.CONST.ERROR.COUCHDB_DOCNOTFOUND            303     No document was found for the provided ID in the database.
         *
         */
        ERROR: {
            /**
             * A constant value for an undefined error.
             *
             * @type Number
             */
            UNDEFINED: 0,
    
            /**
             * A constant value for an error occuring when a connection to an external service could not be established.
             *
             * @type Number
             */
            CONNECTION: 1,
    
            /**
             * A model record failed validation due to a property is not set but required to be.
             *
             * @type Number
             */
            VALIDATION_PRESENCE: 100,
    
            /**
             * A model record failed validation due to a property does not represent a valid URL but is required to do so.
             *
             * @type Number
             */
            VALIDATION_URL: 101,
    
            /**
             * A model record failed validation due to a property does not represent a phone number but is required to do so.
             *
             * @type Number
             */
            VALIDATION_PHONE: 102,
    
            /**
             * A model record failed validation due to a property is not of type number or represents a number but is required to do so.
             *
             * @type Number
             */
            VALIDATION_NUMBER: 103,
    
            /**
             * A model record failed validation due to a property contains a minus value but it is required to do not.
             *
             * @type Number
             */
            VALIDATION_NOTMINUS: 104,
    
            /**
             * A model record failed validation due to a property does not represent a valid eMail but is required to do so.
             *
             * @type Number
             */
            VALIDATION_EMAIL: 105,
    
            /**
             * A model record failed validation due to a property does not represent a valid eMail but is required to do so.
             *
             * @type Number
             */
            VALIDATION_DATE: 106,
    
            /**
             * A Data Provider was not set for a model.
             *
             * @type Number
             */
            MODEL_PROVIDER_NOT_SET: 120,
    
    
            /* WebSQL Error Codes (see e.g. http://www.w3.org/TR/webdatabase/) */
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The transaction failed for reasons unrelated to the database itself and not covered by any other error code.'
             * Error code in WebSQL specification: 0
             *
             * @type Number
             */
            WEBSQL_UNKNOWN: 200,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The statement failed for database reasons not covered by any other error code.'
             * Error code in WebSQL specification: 1
             *
             * @type Number
             */
            WEBSQL_DATABASE: 201,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The transaction failed for reasons unrelated to the database itself and not covered by any other error code.'
             * Error code in WebSQL specification: 2
             *
             * @type Number
             */
            WEBSQL_VERSION: 202,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The statement failed because the data returned from the database was too large. The SQL 'LIMIT' modifier might be useful to reduce the size of the result set.'
             * Error code in WebSQL specification: 3
             *
             * @type Number
             */
            WEBSQL_TOO_LARGE: 203,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The statement failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database.'
             * Error code in WebSQL specification: 4
             *
             * @type Number
             */
            WEBSQL_QUOTA: 204,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'The statement failed because of a syntax error, or the number of arguments did not match the number of ? placeholders in the statement, or the statement tried to use a statement that is not allowed, such as BEGIN, COMMIT, or ROLLBACK, or the statement tried to use a verb that could modify the database but the transaction was read-only.'
             * Error code in WebSQL specification: 5
             *
             * @type Number
             */
            WEBSQL_SYNTAX: 205,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'An INSERT, UPDATE, or REPLACE statement failed due to a constraint failure. For example, because a row was being inserted and the value given for the primary key column duplicated the value of an existing row.'
             * Error code in WebSQL specification: 6
             *
             * @type Number
             */
            WEBSQL_CONSTRAINT: 206,
    
            /**
             * A constant value for an error occuring with WebSQL.
             * 'A lock for the transaction could not be obtained in a reasonable time.'
             * Error code in WebSQL specification: 7
             *
             * @type Number
             */
            WEBSQL_TIMEOUT: 207,
    
            /* following errors are WebSQL Data Provider errors. */
    
            /**
             * A constant value for an error occuring when dbHandler does not exist in
             * data provider. Reason: Initialization did not take place or failed.
             *
             * @type Number
             */
            WEBSQL_NO_DBHANDLER: 208,
    
            /**
             * A constant value for an error occuring with bulkSave operation in dataprovider.
             * The browser doe not support web sql databases.
             *
             * @type Number
             */
            WEBSQL_NOT_SUPPORTED: 209,
    
            /**
             * A constant value for an error occuring with bulkSave operation in dataprovider.
             * No Record array was passed to the method via the param obj.
             *
             * @type Number
             */
            WEBSQL_BULK_NO_RECORDS: 210,
    
    
            /**
             * A constant value for an error occuring when a conflict appears when saving a document in CouchDB. This is propably caused by duplicate IDs
             *
             * @type Number
             */
            COUCHDB_CONFLICT: 300,
    
            /**
             * A constant value for an error occuring if the provided database could not be found
             *
             * @type Number
             */
            COUCHDB_DBNOTFOUND: 301,
    
            /**
             * A constant value for an error occuring if a database that shall be created already exists
             *
             * @type Number
             */
            COUCHDB_DBEXISTS: 302,
    
            /**
             * A constant value for an error occuring if a document could not be found
             *
             * @type Number
             */
            COUCHDB_DOCNOTFOUND: 303
        },
    
        /**
         * input type constants
         */
        INPUT: {
            /**
             * A constant value for input type text
             *
             * @type {String}
             */
            TEXT: 'text',
    
            /**
             * A constant value for input type password
             *
             * @type {String}
             */
            PASSWORD: 'password',
    
            /**
             * A constant value for input type number
             *
             * @type {String}
             */
            NUMBER: 'number',
    
            /**
             * A constant value for input type telephone
             *
             * @type {String}
             */
            TELEPHONE: 'tel',
    
            /**
             * A constant value for input type url
             *
             * @type {String}
             */
            URL: 'url',
    
            /**
             * A constant value for input type email
             *
             * @type {String}
             */
            EMAIL: 'email',
    
            /**
             * A constant value for input type time
             *
             * @type {String}
             */
            TIME: 'time',
    
            /**
             * A constant value for input type date
             *
             * @type {String}
             */
            DATE: 'date',
    
            /**
             * A constant value for input type datetime
             *
             * @type {String}
             */
            DATETIME: 'datetime',
    
            /**
             * A constant value for input type month
             *
             * @type {String}
             */
            MONTH: 'month',
    
            /**
             * A constant value for input type week
             *
             * @type {String}
             */
            WEEK: 'week'
        },
    
        GRID: {
            COLUMNS: 12
        }
    };
    
    M.Object = {
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Object',
    
        /**
         * This property contains an array of interfaces the object implements. This
         * is used internally for initializing the object properly.
         *
         * @type {Array}
         */
        _implementedInterfaces: null,
    
        /**
         * Creates an object based on a passed prototype.
         *
         * @param {Object} proto The prototype of the new object.
         */
        _create: function( proto ) {
            var F = function() {};
            F.prototype = proto;
            return new F();
        },
    
        /**
         * Includes passed properties into a given object.
         *
         * @param {Object} properties The properties to be included into the given object.
         */
        include: function( properties ) {
            for( var prop in properties ) {
                if( this.hasOwnProperty(prop) ) {
                    throw M.Exception.RESERVED_WORD.getException();
                }
                this[prop] = properties[prop];
            }
    
            return this;
        },
    
        /**
         * Creates a new class and extends it with all functions of the defined super class
         * The function takes multiple input arguments. Each argument serves as additional
         * super classes - see mixins.
         *
         * @param {Object} properties The properties to be included into the given object.
         */
        design: function( properties ) {
            /* create the new object */
            // var obj = M.Object._create(this);
            var obj = this._create(this);
    
            /* assign the properties passed with the arguments array */
            obj.include(this._normalize(properties));
    
            /* call the new object's _init method to initialize it */
            obj._init();
    
            /* check if the object implements an interface and init it properly */
            _.each(obj._implementedInterfaces, function( i ) {
                obj.bindToCaller(obj, i._init)();
            }, obj);
    
            /* return the new object */
            return obj;
        },
    
        /**
         * This method is used for adding a certain interface to an existing object. It
         * therefore calls the getInterface() method of the given object and attaches the
         * returned interface to the object. If there already is an implementation of a
         * certain property or method, that one is skipped. So it is possible to overwrite
         * interface suff within the object itself.
         *
         * @param {M.Interface} obj The interface to be implemented.
         * @returns {Object}
         */
        implement: function( obj ) {
            if( obj && obj.isMInterface ) {
                var i = obj.getInterface();
    
                _.each(i, function( value, key ) {
                    if( this[key] ) {
                        i[key] = null;
                        delete i[key];
                    }
                }, this);
    
                this.include(i);
    
                this._implementedInterfaces = this._implementedInterfaces || [];
                this._implementedInterfaces.push(obj);
            }
    
            return this;
        },
    
        /**
         * This method checks whether an object implements a certain interface or not.
         *
         * @param {Object} obj The interface to check for.
         * @returns {Boolean}
         */
        hasInterfaceImplementation: function( obj ) {
            var hasInterfaceImplementation = NO;
            _.each(this._implementedInterfaces, function( i ) {
                if( obj === i ) {
                    hasInterfaceImplementation = YES;
                }
            }, this);
    
            return hasInterfaceImplementation;
        },
    
        /**
         * Binds a method to its caller, so it is always executed within the right scope.
         *
         * @param {Object} caller The scope of the method that should be bound.
         * @param {Function} method The method to be bound.
         * @param {Object} arg One or more arguments. If more, then apply is used instead of call.
         */
        bindToCaller: function( caller, method, arg ) {
            return function() {
                if( typeof method !== 'function' || typeof caller !== 'object' ) {
                    throw M.Exception.INVALID_INPUT_PARAMETER.getException();
                }
                if( Array.isArray(arg) ) {
                    return method.apply(caller, arg);
                }
                return method.call(caller, arg);
            };
        },
    
        /**
         * This method is called right after the creation of a new object and can be used to
         * initialize some internal properties.
         *
         * This implementation in M.Object only serves as some kind of 'interface' declaration.
         */
        _init: function() {
    
        },
    
        /**
         * This method is used internally to normalize the properties object that is used
         * for extending a given object.
         *
         * @param obj
         * @returns {Object}
         * @private
         */
        _normalize: function( obj ) {
            obj = obj && typeof obj === 'object' ? obj : {};
    
            return obj;
        },
    
        /**
         * Calls a method defined by a handler
         *
         * @param {Object} handler A function, or an object including target and action to use with bindToCaller.
         */
        handleCallback: function( handler ) {
            var args = Array.prototype.slice.call(arguments, 1);
            if( handler ) {
                var target = typeof handler.target === 'object' ? handler.target : this;
                var action = handler;
                if( typeof handler.action === 'function' ) {
                    action = handler.action;
                } else if( typeof handler.action === 'string' ) {
                    action = target[handler.action];
                }
                if( typeof action === 'function' ) {
                    return this.bindToCaller(target, action, args)();
                }
            }
        },
    
        /**
         * Returns the type of the object.
         *
         * @return {String}
         */
        getObjectType: function() {
            return this._type;
        },
    
        /**
         * Loops over the registered interfaces and bind them to itself
         * @private
         */
    
        _addInterfaces: function(){
            _.each(this._implementedInterfaces, function( value ) {
                this.implement(value);
            }, this);
        }
    
    };
    /**
     * @class
     *
     * M.Logger defines the prototype for any logging object.
     * It is used to log messages out of the application.
     *
     * @extends M.Object
     */
    M.Logger = M.Object.design(/** @scope M.Logger.prototype */ {
    
        /**
         * Specifies which tags are displayed in the console.
         * Leave this properties empty to display all logs.
         *
         * M.Logger.filter('tag1');
         *
         * M.Logger.log('Init Module', 'tag1');               // will displayed
         * M.Logger.log('Get environment', 'tag2');           // will not displayed
         * M.Logger.log('Loading data', ['tag1', 'tag2']);    // will displayed
         * M.Logger.log('Loading images', ['tag2', 'tag3']);  // will not displayed
         *
         * @type Array
         */
        filter: [],
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Logger',
    
        /**
         * A constant value for logging output: log.
         *
         * @type Number
         * @private
         */
        _OUTPUT_LOG: 0,
    
        /**
         * A constant value for logging output: warning.
         *
         * @type Number
         * @private
         */
        _OUTPUT_DEBUG: 1,
    
        /**
         * A constant value for logging output: warning.
         *
         * @type Number
         * @private
         */
        _OUTPUT_WARN: 2,
    
        /**
         * A constant value for logging output: error.
         *
         * @type Number
         * @private
         */
        _OUTPUT_ERROR: 3,
    
        /**
         * A constant value for logging level: timeEnd.
         *
         * @type Number
         * @private
         */
        _LEVEL_TIME_END: 4,
    
        /**
         * This property holds the fallback entries for _time() / _timeEnd()
         *
         * @type Array
         */
        _times: [],
    
        /**
         * This property holds the fallback entries for _count()
         *
         * @type Array
         */
        _counts: [],
    
        /**
         * This property holds the debugMode from the config
         *
         * @type Boolean
         */
        _appRunsInNotDebugMode: NO,
    
        /**
         * Constructor method for M.Logger
         */
        _init: function() {
    
            // Prevent a console.log from blowing things up if we are on a browser that doesn't support this.
            if( _.isUndefined(console) ) {
                window.console = {};
                console.log = console.debug = console.warn = console.error = function() {
                };
            }
    
            // Check if app runs in debug mode
            // TODO: Get debugMode form config
            this._appRunsInNotDebugMode = NO;
        },
    
        /**
         * This method is used to log a message on logging level debug.
         *
         * @param {String/Array} tag
         * @param {...*} message The logging message.
         */
        log: function( ) {
            this._print(this._OUTPUT_LOG, arguments);
        },
    
        /**
         * This method is used to log a message on logging level warning.
         *
         * @param {String/Array} tag
         * @param {...*} message The logging message.
         */
        warn: function( ) {
            this._print(this._OUTPUT_WARN, arguments);
        },
    
        /**
         * This method is used to log a message on logging level error.
         *
         * @param {String/Array} tag
         * @param {...*} message The logging message.
         */
        error: function( tag, message ) {
            this._print(this._OUTPUT_ERROR, message, tag);
        },
    
        /**
         * Starts a new timer with an associated label.
         *
         * @param {String}
         */
        time: function( label ) {
    
            // Are we in production mode, then do not throw any logs
            if( this._appRunsInNotDebugMode ) {
                return;
            }
    
            // Fallback if the browser doesn't support time
            if( _.isUndefined(console.time2) ) {
                this._time(label);
                return;
            }
            console.time(label);
        },
    
        /**
         * Stops the timer with the specified label and prints the elapsed time.
         *
         * @param {String}
         */
        timeEnd: function( label ) {
    
            // Are we in production mode, then do not throw any logs
            if( this._appRunsInNotDebugMode ) {
                return;
            }
    
            // Fallback if the browser doesn't support timeEnd
            if( _.isUndefined(console.timeEnd2) ) {
                this._timeEnd(label);
                return;
            }
            console.timeEnd(label);
        },
    
        /**
         *  Writes the number of times that count() has been invoked with the same label.
         *
         * @param {String}
         */
        count: function( label ) {
    
            // Are we in production mode, then do not throw any logs
            if( this._appRunsInNotDebugMode ) {
                return;
            }
    
            // Fallback if the browser doesn't support count
            if( _.isUndefined(console.count2) ) {
                this._count(label);
                return;
            }
            console.count(label);
        },
    
        /**
         * This method is used to log anything out of an application based on the given logging level.
         *
         * @param {String} message The logging message.
         * @param {Number} output The logging level.
         * @param {String/Array} tag
         * @private
         */
        _print: function( output, args ) {
    
            // Are we in production mode, then do not throw any logs
            if( this._appRunsInNotDebugMode ) {
                return;
            }
    
            // Assign default level if level is undefined
            output = output || this._OUTPUT_LOG;
    
            args = Array.prototype.slice.call(args);
    
            // Assign default tag if tag is undefined
            if( args.length === 1 ) {
                args.splice(0, 0, M.CONST.LOGGER.TAG_ALL);
            }
    
            var tags = args[0];
    
            if( this._preventOutputByTag(tags) ) {
                return;
            }
    
            var prettyTagName = '';
            if( output < this._OUTPUT_ERROR ) {
                if( _.isArray(tags) && this.filter.length > 0 ) {
                    var tagString = _.without(this.filter, tags);
                    prettyTagName = '[' + tagString + ']';
                } else if( tags.length > 0 ) {
                    prettyTagName = '[' + tags + ']';
                }
            }
    
            if( args.length > 1 ) {
                if( prettyTagName === M.CONST.LOGGER.TAG_ALL ) {
                    args.splice(0, 1);
                } else {
                    args[0] = prettyTagName;
                }
            }
    
            switch( output ) {
                case this._OUTPUT_LOG:
                    console.log.apply(console, args);
                    break;
                case this._OUTPUT_WARN:
                    args.splice(0, 0, 'WARNING:');
                    console.warn.apply(console, args);
                    break;
                case this._OUTPUT_ERROR:
                    args.splice(0, 0, 'ERROR:');
                    console.error.apply(console, args);
                    break;
                case this._OUTPUT_DEBUG:
                    console.debug.apply(console, args);
                    break;
                default:
                    console.log.apply(console, args);
                    break;
            }
        },
    
        /**
         * Fallback if the browser doesn't support time
         *
         * @private
         */
        _time: function( label ) {
            var item = _.find(this._times, function( item ) {
                return item.label === label;
            });
            if( !item ) {
                this._times.push({
                    label: label,
                    time: new Date().getTime()
                });
            }
        },
    
        /**
         * Fallback if the browser doesn't support timeEnd
         *
         * @private
         */
        _timeEnd: function( label ) {
            var item = _.find(this._times, function( item ) {
                return item.label === label;
            });
            if( item ) {
                var now = new Date().getTime();
                var diff = (now - item.time) / 1000;
                var index = this._times.indexOf(item);
                this._print(this._OUTPUT_DEBUG, [item.label + ': ' + diff + 'ms']);
                this._times.splice(index, 1);
            }
        },
    
        /**
         * Fallback if the browser doesn't support count
         *
         * @private
         */
        _count: function( label ) {
            var item = _.find(this._counts, function( item ) {
                return item.label === label;
            });
            if( item === undefined ) {
                this._counts.push({
                    label: label,
                    count: 1
                });
                item = _.last(this._counts);
            } else {
                item.count++;
            }
    
            this._print(this._OUTPUT_DEBUG, [item.label + ': ' + item.count]);
        },
    
        /**
         * Prevent a print() call if the tag is not defined in filter.
         *
         * @param tag {String/Array}
         * @returns {boolean}
         * @private
         */
        _preventOutputByTag: function( tag ) {
            if( this.filter.length > 0 && this.filter.indexOf(M.CONST.TAG_ALL) === -1 ) {
                if( _.isString(tag) ) {
                    if( this.filter.indexOf(tag) === -1 ) {
                        return YES;
                    }
                } else if( _.isArray(tag) ) {
                    if( _.difference(tag, this.filter).length === tag.length ) {
                        return YES;
                    }
                }
            }
            return NO;
        }
    
    });
    M.Controller = function (options) {
        this.options = options || {};
        if (_.isFunction(this.initialize)) {
            this.initialize(this.options);
        }
    };
    
    M.Controller.extend = M.extend;
    M.Controller.create = M.create;
    M.Controller.design = M.design;
    
    _.extend(M.Controller.prototype, Backbone.Events, {
    
        _type: 'M.Controller',
    
        /**
         *
         * @param {Object} options
         * @returns {Controller}
         */
        initialize: function () {
            return this;
        },
    
        applicationStart: function () {
    
        },
    
        show: function () {
    
        },
    
        set: function (name, value) {
            this[name] = value;
            this.trigger(name, value);
        },
    
        get: function (name) {
            return this[name];
        }
    });
    M.Application = M.Controller.extend({
    
        _type: 'M.Application',
    
        Models: null,
    
        Collections: null,
    
        Views: null,
    
        Controllers: null,
    
        Routers: null,
    
        _transition: '',
    
        _isReady: NO,
    
        initialize: function () {
            this.Models = {};
            this.Collections = {};
            this.Views = {};
            this.Controllers = {};
            this.Routers = {};
            return this;
        },
    
        start: function (options) {
            this._initLocale(options).then(function () {
                Backbone.history.start();
            });
    
            return this;
        },
    
        navigate: function (settings) {
    
            var url = settings.route;
            var path = '';
            if (settings.params) {
                path = _.isArray(settings.params) ? settings.params.join('/') : settings.params;
                url += '/';
            }
            if (!settings.transition) {
                settings.transition = M.PageTransitions.MOVE_TO_LEFT_FROM_RIGHT;
            }
    
            this._setTransition(settings.transition);
    
            var options = settings.options || true;
            Backbone.history.navigate(url + path, options);
        },
    
        startTransition: function () {
            this.layout.startTransition({
                transition: this._getTransition()
            });
        },
    
        _initLocale: function (options) {
            var defer = $.Deferred();
    
            M.I18N.on(M.CONST.I18N.LOCALE_CHANGED, function () {
                defer.resolve();
            });
    
            if (options && options.locales) {
                M.I18N.setLocales(options.locales);
                M.I18N.setLocale(moment.lang());
            } else {
                defer.resolve();
            }
    
            return defer.promise();
        },
    
        _setTransition: function (name) {
            this._transition = name;
        },
    
        _getTransition: function () {
            return this._transition;
        },
    
        _initReady: function(){
            if(this._isReady) {
                return;
            }
    
            //TODO: implment this in config
            // $('body').append(M.DebugView.design().render().$el);
    
            this._isReady = YES;
        }
    });
    
    
    M.Router = Backbone.Router.extend();
    M.Router.create = M.create;
    M.Router.design = M.design;
    
    _.extend(M.Router.prototype, M.Object, {
    
        _type: 'M.Router',
    
        _visitedRoutes: {},
    
        initialize: function() {
    
        },
    
        controllerDidLoad: function( name, controller, res, callback ) {
            var _callback = this.getCallBack(controller);
            if(_.isFunction(_callback)){
                _callback.apply(controller, [res]);
            }
            callback();
            global[M.APPLICATION_NAME]._initReady();
        },
    
        callCallback: function( route, name, controller, res, callback ) {
    
    
            var that = this;
            if( _.isString(controller) ) {
                require([controller], function( ctrl ) {
                    that.controllerDidLoad(name, ctrl, res, callback);
                });
            } else if( M.Controller.prototype.isPrototypeOf(controller) ) {
                setTimeout(function() {
                    that.controllerDidLoad(name, controller, res, callback);
                }, 0);
            }
    
            return this;
        },
    
        getCallBack: function( controller ) {
    
            var _callback = null;
            if( Object.keys(this._visitedRoutes).length === 0 ) {
                _callback = controller.applicationStart;
            } else {
                _callback = controller.show;
            }
            return _callback;
        },
    
        route: function( route, name, controller ) {
    
            if( !_.isRegExp(route) ) {
                route = this._routeToRegExp(route);
            }
            if( _.isFunction(name) ) {
                controller = name;
                name = '';
            }
            if( !controller ) {
                controller = this[name];
            }
    
            var router = this;
            Backbone.history.route(route, function( fragment ) {
                var res = {};
                _.each(router.routes, function( val, key ) {
    
                    var reg = /\(?(\/:[^)]+)\)?$/;
                    ///^page4\(?(/:[^)]+)\)?$/
                    var exec = reg.exec(key);
                    if( exec && exec.length ) {
                        var s = exec.slice(1);
                        res = s[0].replace('/:', '');
                    }
                });
                var args = router._extractParameters(route, fragment);
                res = _.object([res], args);
                args.unshift(!router._visitedRoutes[name]);
                router.callCallback(route, name, controller, res, function() {
                    router.trigger.apply(router, ['route:' + name].concat(args));
                    router.trigger('route', name, args);
                    Backbone.history.trigger('route', router, name, args);
                    if( !router._visitedRoutes[name] ) {
                        router._visitedRoutes[name] = true;
                    }
                });
            });
            return this;
        }
    
    });
    /**
     * Use the ViewManager to quick access views
     * @type {*}
     */
    M.ViewManager = M.Object.design({
    
    
        /**
         * Object of all registered views
         */
        _allViews: null,
    
    
        /**
         * all views register themself inside the initialize function to the ViewManager.
         * @param view
         */
        registerView: function( view ) {
    
            if( !_.isObject(this._allViews) ) {
                this._allViews = {};
            }
    
            if( !view.cid ) {
                console.warn('view has no cid');
                return;
            }
    
            if( this._allViews[view.cid] ) {
                console.warn('view already registered');
            } else {
                this._allViews[view.cid] = view;
            }
        },
    
        /**
         * @example M.ViewManager.getView($0) // $0 is a selected DOM element
         * @param searchterm
         * @returns {*}
         */
        getView: function( searchterm ) {
    
            if( !searchterm ) {
                return false;
            }
    
            if( this._allViews[searchterm] ) {
                return this._allViews[searchterm];
            } else if( searchterm.DOCUMENT_NODE ) {
                return _.find(this._allViews, function( view ) {
                    return (view.el === searchterm);
                });
            }
        }
    
    });
    /**
     * @class
     *
     * M.Environment wraps the Modernizr plugin Detectizr.
     * Thanks to https://github.com/barisaydinoglu/Detectizr which is Licensed under MIT license.
     *
      */
    
    Modernizr.Detectizr.detect({detectScreen:false});
    M.Environment = Modernizr.Detectizr;
    
    
    M.I18NItem = M.Object.design({
    
        /**
         * The type of this object.
         *
         * @type {String}
         * @private
         */
        _type: 'M.I18NItem',
    
        /**
         * The translation key. Used to identify the locale item.
         *
         * @type {String}
         */
        key: null,
    
        /**
         * The translation placeholder as a key-value pair.
         * Used to replace all {{placeholderName}} in the locale string
         * with the appropriate value.
         *
         * Example:
         * {
         *    username: 'Tom',
         *    status: 'offline'
         * }
         *
         * @type {Object}
         */
        placeholder: null,
    
        /**
         * Creates a new instance with the given key and placeholder.
         * Used to hold the key and placeholder for later use.
         *
         * @param key {String}
         * @param placeholder {String}
         * @returns {M.I18NItem}
         */
        create: function (key, placeholder) {
            if(!key) {
                return null;
            }
    
            this.key = key;
            if(placeholder) {
                this.placeholder = placeholder;
            }
            return _.extend({}, this);
        }
    });
    /**
     * @class
     *
     * M.I18N defines a prototype for internationalisation and localisation within
     * The M-Project. It is used to set and get the application's language and to
     * localize any string within an application.
     */
    M.I18N = _.extend(Backbone.Events, M.Object.design({
    
        /**
         * The type of this object.
         *
         * @private
         */
        _type: 'M.I18N',
    
        /**
         * List of available locales.
         *
         * @private
         */
        _availableLocales: [],
    
        /**
         * The current active locale
         *
         * @private
         */
        _activeLocale: null,
    
        /**
         * List of loaded dictionaries
         *
         * @private
         */
        _dictionary: [],
    
        /**
         * Set all available locales.
         *
         * @returns {Array}
         */
        setLocales: function (locales) {
            if (locales && _.isArray(locales) && locales.length > 0) {
                this._availableLocales = locales;
                return true;
            } else {
                console.log('No locales given!');
                return false;
            }
        },
    
        /**
         * Returns all available locales.
         *
         * @returns {Array}
         */
        getLocales: function () {
            return this._availableLocales;
        },
    
        /**
         * Changes the active locale.
         *
         * @param {String}
         */
        setLocale: function (locale) {
            this._activeLocale = locale;
            this.loadFileForLocale();
            // TODO store locale
        },
    
        /**
         * Returns the active locale
         *
         * @returns {String}
         */
        getLocale: function () {
            return this._activeLocale;
        },
    
        /**
         * This is just a shorthand for M.I18NItem.create
         *
         * @param key
         * @param placeholder
         * @returns {key|*}
         */
        get: function (key, placeholder) {
            return M.I18NItem.create(key, placeholder);
        },
    
        /**
         * Translates key into current locale, given placeholders
         * in {{placeholderName}} are replaced with the appropriate value.
         *
         * @param key
         * @param placeholder
         * @returns {*}
         */
        l: function (key, placeholder) {
            if (this._dictionary[this._activeLocale] === undefined || key === undefined || key === '' || key === null) {
                return '';
            }
    
            var translation = this._dictionary[this._activeLocale];
            translation = translation[key];
    
            if (translation) {
                /**
                 * Replace placeholders with actual values
                 */
                if (placeholder) {
                    _.each(placeholder, function (value, key) {
                        translation = translation.replace('{{' + key + '}}', value);
                    });
                }
            } else {
                translation = 'MISSING TRANSLATION ' + this._activeLocale + ': ' + key;
                console.log(translation);
            }
    
            return translation;
        },
    
        /**
         * Loads the locale file and puts it into dictionary
         */
        loadFileForLocale: function () {
            var fileUrl = 'i18n/' + this._activeLocale + '.json';
    
            // set locale for moment.js
            moment.lang(this._activeLocale.substr(0, 2));
            var that = this;
    
            // Load file only if it's not yet available
            if (this._dictionary[that._activeLocale] === undefined) {
                $.getJSON(fileUrl)
                    .success(function (response) {
                        that._setDictionary(response);
                    })
                    .error(function () {
                        // TODO handle error
                        console.log('_activeLocale for ' + that._activeLocale + ' not found');
                    });
            }
            else {
                this._triggerLocaleChangedEvent();
            }
        },
    
        /**
         * Keeps the given keys in the dictionary.
         *
         * @param {Object}
         * @private
         */
        _setDictionary: function (locales) {
            var parsed = this._parseObject(locales);
            this._dictionary[this._activeLocale] = parsed;
            this._triggerLocaleChangedEvent();
        },
    
        /**
         * Triggers the locale changed event.
         *
         * @private
         */
        _triggerLocaleChangedEvent: function () {
            this.trigger(M.CONST.I18N.LOCALE_CHANGED, this._activeLocale);
        },
    
        /**
         * Return a flattened version of an object.
         *
         * @param {Object}
         * @returns {Object}
         * @private
         */
        _parseObject: function (obj) {
            var result = {};
            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }
                if (_.isObject(obj[key])) {
                    var flatObject = this._parseObject(obj[key]);
                    for (var childKey in flatObject) {
                        if (!flatObject.hasOwnProperty(childKey)) {
                            continue;
                        }
                        result[key + '.' + childKey] = flatObject[childKey];
                    }
                } else {
                    result[key] = obj[key];
                }
            }
            return result;
        }
    }));
    
    
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Frank
    // Date:      14.04.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    // ===========================================================================
    //
    // M.ObjectId uses code from meteor.js
    // https://github.com/meteor/meteor/blob/master/packages/minimongo
    //
    // Thanks for sharing!
    //
    // ===========================================================================
    
    // m_require('core/foundation/object.js');
    M.ObjectID = function( hexString ) {
        M.ObjectID.counter   = M.ObjectID.counter   || parseInt(Math.random() * Math.pow(16, 6));
        M.ObjectID.machineId = M.ObjectID.machineId || parseInt(Math.random() * Math.pow(16, 6));
        M.ObjectID.processId = M.ObjectID.processId || parseInt(Math.random() * Math.pow(16, 4));
        this._ObjectID(hexString);
    };
    
    M.ObjectID._looksLikeObjectID = function( str ) {
        return str.length === 24 && str.match(/^[0-9a-f]*$/);
    };
    
    _.extend(M.ObjectID.prototype, {
    
        _str: '',
    
        _ObjectID: function( hexString ) {
            //random-based impl of Mongo ObjectID
            if( hexString ) {
                hexString = hexString.toLowerCase();
                if( !M.ObjectID._looksLikeObjectID(hexString) ) {
                    throw new Error('Invalid hexadecimal string for creating an ObjectID');
                }
                // meant to work with _.isEqual(), which relies on structural equality
                this._str = hexString;
            } else {
    
                this._str =
                    this._hexString(8, new Date().getTime()/1000) +     // a 4-byte value from the Unix timestamp
                    this._hexString(6, M.ObjectID.machineId) +          // a 3-byte machine identifier
                    this._hexString(4, M.ObjectID.processId) +          // a 2-byte process identifier
                    this._hexString(6, M.ObjectID.counter++);   // a 3-byte counter, starting with a random value.
            }
            return this._str;
        },
    
        _hexString: function(len, num) {
            num = num || parseInt(Math.random() * Math.pow(16,len));
            var str = num.toString(16);
            while(str.length < len) {
                str = '0'+str;
            }
            return str.substr(0, len);
        },
    
        toString: function() {
            return 'ObjectID(\'' + this._str + '\')';
        },
    
        equals: function( other ) {
            return other instanceof this._ObjectID && this.valueOf() === other.valueOf();
        },
    
        clone: function() {
            return new M.ObjectID(this._str);
        },
    
        typeName: function() {
            return 'oid';
        },
    
        getTimestamp: function() {
            return parseInt(this._str.substr(0, 8), 16)*1000;
        },
    
        getMachineId: function() {
            return parseInt(this._str.substr(8, 6), 16);
        },
    
        getProcessId: function() {
            return parseInt(this._str.substr(14, 4), 16);
        },
    
        getCounter: function() {
            return parseInt(this._str.substr(18, 6), 16);
        },
    
        valueOf: function() {
            return this._str;
        },
    
        toJSON: function() {
            return this._str;
        },
    
        toHexString: function() {
            return this._str;
        },
    
        // Is this selector just shorthand for lookup by _id?
        _selectorIsId: function( selector ) {
            return (typeof selector === 'string') ||
                (typeof selector === 'number') ||
                selector instanceof M.ObjectId;
        },
    
        // Is the selector just lookup by _id (shorthand or not)?
        _selectorIsIdPerhapsAsObject: function( selector ) {
            return this._selectorIsId(selector) || (selector && typeof selector === 'object' && selector._id && this._selectorIsId(selector._id) && _.size(selector) === 1);
        },
    
        // If this is a selector which explicitly constrains the match by ID to a finite
        // number of documents, returns a list of their IDs.  Otherwise returns
        // null. Note that the selector may have other restrictions so it may not even
        // match those document!  We care about $in and $and since those are generated
        // access-controlled update and remove.
        _idsMatchedBySelector: function( selector ) {
            // Is the selector just an ID?
            if( this._selectorIsId(selector) ) {
                return [selector];
            }
            if( !selector ) {
                return null;
            }
    
            // Do we have an _id clause?
            if( _.has(selector, '_id') ) {
                // Is the _id clause just an ID?
                if( this._selectorIsId(selector._id) ) {
                    return [selector._id];
                }
                // Is the _id clause {_id: {$in: ["x", "y", "z"]}}?
                if( selector._id && selector._id.$in && _.isArray(selector._id.$in) && !_.isEmpty(selector._id.$in) && _.all(selector._id.$in, this._selectorIsId) ) {
                    return selector._id.$in;
                }
                return null;
            }
    
            // If this is a top-level $and, and any of the clauses constrain their
            // documents, then the whole selector is constrained by any one clause's
            // constraint. (Well, by their intersection, but that seems unlikely.)
            if( selector.$and && _.isArray(selector.$and) ) {
                for( var i = 0; i < selector.$and.length; ++i ) {
                    var subIds = this._idsMatchedBySelector(selector.$and[i]);
                    if( subIds ) {
                        return subIds;
                    }
                }
            }
    
            return null;
        }
    });
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2011 panacoda GmbH. All rights reserved.
    // Creator:   Sebastian
    // Date:      04.01.2011
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    // Returns a unique identifier
    
    // m_require('core/foundation/object.js');
    
    M.UniqueId = M.Object.design({
        uuid: function(len, radix) {
            // based on Robert Kieffer's randomUUID.js at http://www.broofa.com
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [];
            //len = len ? len : 32; 
            radix = radix || chars.length;
            var i;
    
            if (len) {
                for (i = 0; i < len; i++) {
                    uuid[i] = chars[0 | Math.random() * radix];
                }
            } else {
                // rfc4122, version 4 form
                var r;
    
                // rfc4122 requires these characters
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
    
                // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        }
    });
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2011 panacoda GmbH. All rights reserved.
    // Creator:   Dominik
    // Date:      11.11.2010
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * @class
     *
     * This prototype defines decoding and encoding mechanisms based on the Base64 algorithm. You
     * normally don't call this object respectively its methods directly, but let M.Cypher handle
     * this.
     *
     * @extends M.Object
     */
    M.Base64 = M.Object.design(/** @scope M.Base64.prototype */ {
    
            /**
             * The type of this object.
             *
             * @type String
             */
            type: 'M.Base64',
    
            /**
             * The key string for the base 64 decoding and encoding.
             *
             * @type String
             */
            _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    
            /**
             * This method encodes a given binary input, using the base64 encoding.
             *
             * @param {String} input The binary to be encoded. (e.g. an requested image)
             * @returns {String} The base64 encoded string.
             */
            encodeBinary: function( input ) {
                var output = '';
                var bytebuffer;
                var encodedCharIndexes = new Array(4);
                var inx = 0;
                var paddingBytes = 0;
    
                while( inx < input.length ) {
                    // Fill byte buffer array
                    bytebuffer = new Array(3);
                    for( var jnx = 0; jnx < bytebuffer.length; jnx++ ) {
                        if( inx < input.length ) {
                            bytebuffer[jnx] = input.charCodeAt(inx++) & 0xff;
                        } // throw away high-order byte, as documented at: https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
                        else {
                            bytebuffer[jnx] = 0;
                        }
                    }
    
                    // Get each encoded character, 6 bits at a time
                    // index 1: first 6 bits
                    encodedCharIndexes[0] = bytebuffer[0] >> 2;
                    // index 2: second 6 bits (2 least significant bits from input byte 1 + 4 most significant bits from byte 2)
                    encodedCharIndexes[1] = ((bytebuffer[0] & 0x3) << 4) | (bytebuffer[1] >> 4);
                    // index 3: third 6 bits (4 least significant bits from input byte 2 + 2 most significant bits from byte 3)
                    encodedCharIndexes[2] = ((bytebuffer[1] & 0x0f) << 2) | (bytebuffer[2] >> 6);
                    // index 3: forth 6 bits (6 least significant bits from input byte 3)
                    encodedCharIndexes[3] = bytebuffer[2] & 0x3f;
    
                    // Determine whether padding happened, and adjust accordingly
                    paddingBytes = inx - (input.length - 1);
                    switch( paddingBytes ) {
                        case 2:
                            // Set last 2 characters to padding char
                            encodedCharIndexes[3] = 64;
                            encodedCharIndexes[2] = 64;
                            break;
                        case 1:
                            // Set last character to padding char
                            encodedCharIndexes[3] = 64;
                            break;
                        default:
                            break; // No padding - proceed
                    }
                    // Now we will grab each appropriate character out of our keystring
                    // based on our index array and append it to the output string
                    for( jnx = 0; jnx < encodedCharIndexes.length; jnx++ ) {
                        output += this._keyStr.charAt(encodedCharIndexes[jnx]);
                    }
                }
                return output;
            },
    
            /**
             * This method encodes a given input string, using the base64 encoding.
             *
             * @param {String} input The string to be encoded.
             * @returns {String} The base64 encoded string.
             */
            encode: function( input ) {
                var output = '';
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
    
                input = M.Cypher.utf8Encode(input);
    
                while( i < input.length ) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
    
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
    
                    if( isNaN(chr2) ) {
                        enc3 = enc4 = 64;
                    } else if( isNaN(chr3) ) {
                        enc4 = 64;
                    }
    
                    output += this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                }
    
                return output;
            },
    
            binaryEncode: function( input ) {
                var output = '';
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
    
                while( i < input.length ) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
    
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
    
                    if( isNaN(chr2) ) {
                        enc3 = enc4 = 64;
                    } else if( isNaN(chr3) ) {
                        enc4 = 64;
                    }
    
                    output += this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                }
    
                return output;
            },
    
            /**
             * This method decodes a given input string, using the base64 decoding.
             *
             * @param {String} input The string to be decoded.
             * @returns {String} The base64 decoded string.
             */
            decode: function( input ) {
                var output = '';
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
    
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    
                while( i < input.length ) {
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));
    
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
    
                    output = output + String.fromCharCode(chr1);
    
                    if( enc3 !== 64 ) {
                        output = output + String.fromCharCode(chr2);
                    }
    
                    if( enc4 !== 64 ) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
    
                return M.Cypher.utf8Decode(output);
            }
    
        });
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2011 panacoda GmbH. All rights reserved.
    // Creator:   Dominik
    // Date:      11.11.2010
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * @class
     *
     * This prototype defines a hashing mechanism based on the SHA256 algorithm. You normally
     * don't call this object respectively its methods directly, but let M.Cypher handle
     * this.
     *
     * @extends M.Object
     */
    M.SHA256 = M.Object.design(/** @scope M.SHA256.prototype */ {
    
            /**
             * The type of this object.
             *
             * @type String
             */
            type: 'M.SHA256',
    
            /**
             * Defines the bits per input character: 8 - ASCII, 16 - Unicode
             *
             * @type Number
             */
            chrsz: 8,
    
            /**
             * Defines the hex output format: 0 - lowercase, 1 - uppercase
             *
             * @type Number
             */
            hexcase: 0,
    
            /**
             * This method is called from the 'outside world', controls the hashing and
             * finally returns the hash value.
             *
             * @param {String} input The input string to be hashed.
             * @returns {String} The sha256 hashed string.
             */
            hash: function( input ) {
                input = M.Cypher.utf8Encode(input);
                return this.binb2hex(this.coreSha256(this.str2binb(input), input.length * this.chrsz));
            },
    
            /**
             * @private
             */
            safeAdd: function( x, y ) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            },
    
            /**
             * @private
             */
            S: function( X, n ) {
                return ( X >>> n ) | (X << (32 - n));
            },
    
            /**
             * @private
             */
            R: function( X, n ) {
                return ( X >>> n );
            },
    
            /**
             * @private
             */
            Ch: function( x, y, z ) {
                return ((x & y) ^ ((~x) & z));
            },
    
            /**
             * @private
             */
            Maj: function( x, y, z ) {
                return ((x & y) ^ (x & z) ^ (y & z));
            },
    
            /**
             * @private
             */
            Sigma0256: function( x ) {
                return (this.S(x, 2) ^ this.S(x, 13) ^ this.S(x, 22));
            },
    
            /**
             * @private
             */
            Sigma1256: function( x ) {
                return (this.S(x, 6) ^ this.S(x, 11) ^ this.S(x, 25));
            },
    
            /**
             * @private
             */
            Gamma0256: function( x ) {
                return (this.S(x, 7) ^ this.S(x, 18) ^ this.R(x, 3));
            },
    
            /**
             * @private
             */
            Gamma1256: function( x ) {
                return (this.S(x, 17) ^ this.S(x, 19) ^ this.R(x, 10));
            },
    
            /**
             * @private
             */
            coreSha256: function( m, l ) {
                var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
                var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
                var W = new Array(64);
                var a, b, c, d, e, f, g, h, i, j;
                var T1, T2;
    
                m[l >> 5] |= 0x80 << (24 - l % 32);
                m[((l + 64 >> 9) << 4) + 15] = l;
    
                for( i = 0; i < m.length; i += 16 ) {
                    a = HASH[0];
                    b = HASH[1];
                    c = HASH[2];
                    d = HASH[3];
                    e = HASH[4];
                    f = HASH[5];
                    g = HASH[6];
                    h = HASH[7];
    
                    for( j = 0; j < 64; j++ ) {
                        if( j < 16 ) {
                            W[j] = m[j + i];
                        } else {
                            W[j] = this.safeAdd(this.safeAdd(this.safeAdd(this.Gamma1256(W[j - 2]), W[j - 7]), this.Gamma0256(W[j - 15])), W[j - 16]);
                        }
    
                        T1 = this.safeAdd(this.safeAdd(this.safeAdd(this.safeAdd(h, this.Sigma1256(e)), this.Ch(e, f, g)), K[j]), W[j]);
                        T2 = this.safeAdd(this.Sigma0256(a), this.Maj(a, b, c));
    
                        h = g;
                        g = f;
                        f = e;
                        e = this.safeAdd(d, T1);
                        d = c;
                        c = b;
                        b = a;
                        a = this.safeAdd(T1, T2);
                    }
    
                    HASH[0] = this.safeAdd(a, HASH[0]);
                    HASH[1] = this.safeAdd(b, HASH[1]);
                    HASH[2] = this.safeAdd(c, HASH[2]);
                    HASH[3] = this.safeAdd(d, HASH[3]);
                    HASH[4] = this.safeAdd(e, HASH[4]);
                    HASH[5] = this.safeAdd(f, HASH[5]);
                    HASH[6] = this.safeAdd(g, HASH[6]);
                    HASH[7] = this.safeAdd(h, HASH[7]);
                }
                return HASH;
            },
    
            /**
             * @private
             */
            str2binb: function( str ) {
                var bin = [];
                var mask = (1 << this.chrsz) - 1;
                for( var i = 0; i < str.length * this.chrsz; i += this.chrsz ) {
                    bin[i >> 5] |= (str.charCodeAt(i / this.chrsz) & mask) << (24 - i % 32);
                }
                return bin;
            },
    
            /**
             * @private
             */
            binb2hex: function( binarray ) {
                var hexTab = this.hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
                var str = '';
                for( var i = 0; i < binarray.length * 4; i++ ) {
                    str += hexTab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hexTab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8  )) & 0xF);
                }
                return str;
            }
    
        });
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2011 panacoda GmbH. All rights reserved.
    // Creator:   Dominik
    // Date:      11.11.2010
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * @class
     *
     * M.Cypher defines a prototype for handling decoding, encoding and hashing of string
     * based values.
     *
     * @extends M.Object
     */
    M.Cypher = M.Object.design(/** @scope M.Cypher.prototype */ {
    
            /**
             * The type of this object.
             *
             * @type String
             */
            type: 'M.Cypher',
    
            /**
             * The default decoder.
             *
             * @type M.Base64
             */
            defaultDecoder: M.Base64,
    
            /**
             * The default encoder.
             *
             * @type M.Base64
             */
    
            defaultEncoder: M.Base64,
    
            /**
             * The default hash algorithm.
             *
             * @type M.SHA256
             */
    
            defaultHasher: M.SHA256,
    
            /**
             * This method is the one that initiates the decoding of a given string, based on either
             * the default decoder or a custom decoder.
             *
             * @param {String} input The input string to be decoded.
             * @param {Object} algorithm The algorithm object containing a decode method.
             * @returns {String} The decoded string.
             */
            decode: function( input, algorithm ) {
    
                if( algorithm && algorithm.decode ) {
                    return algorithm.decode(input);
                } else {
                    return this.defaultDecoder.decode(input);
                }
    
            },
    
            /**
             * This method is the one that initiates the encoding of a given string, based on either
             * the default encoder or a custom encoder.
             *
             * @param {String} input The input string to be decoded.
             * @param {Object} algorithm The algorithm object containing a encode method.
             * @returns {String} The encoded string.
             */
            encode: function( input, algorithm ) {
    
                if( algorithm && algorithm.encode ) {
                    return algorithm.encode(input);
                } else {
                    return this.defaultEncoder.encode(input);
                }
    
            },
    
            /**
             * This method is the one that initiates the hashing of a given string, based on either
             * the default hashing algorithm or a custom hashing algorithm.
             *
             * @param {String} input The input string to be hashed.
             * @param {Object} algorithm The algorithm object containing a hash method.
             * @returns {String} The hashed string.
             */
            hash: function( input, algorithm ) {
    
                if( algorithm && algorithm.hash ) {
                    return algorithm.hash(input);
                } else {
                    return this.defaultHasher.hash(input);
                }
    
            },
    
            /**
             * Private method for UTF-8 encoding
             *
             * @private
             * @param {String} string The string to be encoded.
             * @returns {String} The utf8 encoded string.
             */
            utf8Encode: function( string ) {
                string = string.replace(/\r\n/g, '\n');
                var utf8String = '';
    
                for( var n = 0; n < string.length; n++ ) {
    
                    var c = string.charCodeAt(n);
    
                    if( c < 128 ) {
                        utf8String += String.fromCharCode(c);
                    } else if( (c > 127) && (c < 2048) ) {
                        utf8String += String.fromCharCode((c >> 6) | 192);
                        utf8String += String.fromCharCode((c & 63) | 128);
                    } else {
                        utf8String += String.fromCharCode((c >> 12) | 224);
                        utf8String += String.fromCharCode(((c >> 6) & 63) | 128);
                        utf8String += String.fromCharCode((c & 63) | 128);
                    }
    
                }
    
                return utf8String;
            },
    
            /**
             * Private method for UTF-8 decoding
             *
             * @private
             * @param {String} string The string to be decoded.
             * @returns {String} The utf8 decoded string.
             */
            utf8Decode: function( utf8String ) {
                var string = '';
                var i;
                var c;
                var c1;
                var c2;
                var c3;
                i = c = c1 = c2 = 0;
    
                while( i < utf8String.length ) {
    
                    c = utf8String.charCodeAt(i);
    
                    if( c < 128 ) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if( (c > 191) && (c < 224) ) {
                        c2 = utf8String.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utf8String.charCodeAt(i + 1);
                        c3 = utf8String.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
    
                }
    
                return string;
            }
    
        });
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2011 panacoda GmbH. All rights reserved.
    // Creator:   Frank
    // Date:      29.03.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    
    /**
     * @class
     *
     * @extends M.Object
     */
    
    M.Date = {
    
        /**
         * This method is used to create a new instance of M.Date based on the data
         * library moment.js.
         *
         * @returns {Object}
         */
        create: function() {
            var m = moment.apply(this, arguments);
            return _.extend(m, this);
        }
    };
    
    
    
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Dominik
    // Date:      13.05.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * @class
     * @extends M.Object
     */
    M.Request = M.Object.design(/** @scope M.Request.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Request',
    
        /**
         * This property contains the requests unique ID that is generated
         * when initializing a request object. It is used within an application
         * to identify a request object.
         */
        _id: null,
    
        /**
         * This property is used internally to store the jQuery request object.
         *
         * @type {Object}
         */
        _request: null,
    
        /**
         * The http method to use for the request. Default is GET.
         *
         * @type {String}
         */
        method: null,
    
        /**
         * The url to connect to. This property has to be set in order to init
         * an instance of M.Request.
         *
         * @type {String}
         */
        url: null,
    
        /**
         * The property can be used to specify a request timeout in milliseconds. By
         * default, there will be no timeout.
         *
         * @type {Number}
         */
        timeout: null,
    
        /**
         * The data property can be used to attach any kind of data to a request. This can
         * either be a JSON object (key/value) or a string.
         *
         * @type {Object|String}
         */
        data: null,
    
        /**
         * This method is based on M.Object's extend() but adds some request specific features.
         * It creates a new instance of M.Request based on the given configuration properties.
         *
         * @param obj
         * @returns {M.Request}
         */
        init: function( obj ) {
            return this.design(obj);
        },
    
        /**
         * This method is used internally to process the configuration object for the request
         * before handing it to the extend method. The job of this method is to make sure that
         * the configuration object fits the requirements of the extend process.
         *
         * @param obj
         * @returns Object
         * @private
         */
        _normalize: function( obj ) {
            obj = obj && typeof obj === 'object' ? obj : {};
            obj.callbacks = obj.callbacks || {};
    
            return obj;
        },
    
        /**
         * M.Request's _init method.
         *
         * @private
         */
        _init: function() {
            /* throw exception if this is an instance of M.Request and there is no URL given */
            if( Object.getPrototypeOf(this) === M.Request && !this.url ) {
                throw M.Exception.NO_REQUEST_URL_SPECIFIED.getException();
            }
    
            /* generate the requests uuid */
            this._id = M.UniqueId.uuid();
    
            /* check for method and eventually set to GET (default) */
            this.method = this.method || 'GET';
    
            /* set the data property to what is given or empty string */
            this.data = this.data || '';
    
            /* check for a timeout property and eventually remove it */
            if( typeof this.timeout !== 'number' || this.timeout < 0 ) {
                delete this.timeout;
            }
        },
    
        /**
         * This method returns the request's unique ID. This ID is automatically generated
         * on the initialization of the request.
         *
         * @returns {String}
         */
        getId: function() {
            return this._id;
        },
    
        send: function() {
            this._request = $.ajax({
                type: this.method,
                url: this.url,
                timeout: this.timeout,
                data: this.data,
                context: this,
                beforeSend: this._handleBeforeSend,
                success: this._handleSuccess,
                error: this._handleError
            });
        },
    
        cancel: function() {
            if( this._request ) {
                this._request.abort();
            }
            this._request = null;
        },
    
        /**
         * This method is used internally to handle the before send callbacks. It
         * automatically calls any registered before send handler.
         *
         * @param xhr
         * @private
         */
        _handleBeforeSend: function( xhr ) {
            this.handleCallback(this.callbacks.beforeSend, {
                id: this.getId(),
                xhr: xhr
            });
        },
    
        /**
         * This method is used internally to handle the success callbacks. It
         * automatically calls any registered success handler.
         *
         * @param data
         * @param status
         * @param xhr
         * @private
         */
        _handleSuccess: function( data, status, xhr ) {
            this.handleCallback(this.callbacks.success, {
                id: this.getId(),
                data: data,
                status: status,
                xhr: xhr
            });
    
            this.cancel();
        },
    
        /**
         * This method is used internally to handle the error callbacks. It
         * automatically calls any registered error handler.
         *
         * @param xhr
         * @param status
         * @param error
         * @private
         */
        _handleError: function( xhr, status, error ) {
            this.handleCallback(this.callbacks.error, {
                id: this.getId(),
                xhr: xhr,
                status: status,
                error: error
            });
    
            this.cancel();
        },
    
        setAuthentication: function( xhr, credentials ) {
            if( credentials && credentials.username && xhr && M.Base64 ) {
                var basicAuth = M.Base64.encode(encodeURIComponent(credentials.username + ':' + (credentials.password || '')));
                xhr.setRequestHeader('Authorization', 'Basic ' + basicAuth);
            }
        },
    
        /*
         url = "http://example.com:3000/pathname/?search=test#hash";
    
         location.protocol; // => "http:"
         location.host;     // => "example.com:3000"
         location.hostname; // => "example.com"
         location.port;     // => "3000"
         location.pathname; // => "/pathname/"
         location.hash;     // => "#hash"
         location.search;   // => "?search=test"
         */
        getLocation: function( url ) {
            var location = document.createElement('a');
            location.href = url || this.url;
            // IE doesn't populate all link properties when setting .href with a relative URL,
            // however .href will return an absolute URL which then can be used on itself
            // to populate these additional fields.
            if( location.host === '' ) {
                location.href = location.href;
            }
            return location;
        }
    
    });
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Dominik
    // Date:      13.05.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * @class
     * @extends M.Object
     */
    M.RequestManager = M.Object.design(/** @scope M.RequestManager.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.RequestManager',
    
        /**
         * The url to connect to. This property has to be set in order to init
         * an instance of M.RequestManager. It contains the base url for each
         * request performed by this request manager.
         *
         * @type {String}
         */
        baseUrl: null,
    
        /**
         * The http method to use for each request. This timeout will be used as
         * the request manager's default value. It can be overwritten when
         * calling makeRequest(). Default is GET.
         *
         * @type {String}
         */
        method: null,
        /**
         * The property can be used to specify a request timeout in milliseconds. This
         * timeout will be used as the request manager's default value. It can be
         * overwritten when calling makeRequest().
         *
         * @type {Number}
         */
        timeout: null,
    
        /**
         * This property is used internally to store requests initialized out of the
         * request manager. It is built as a hash map with the request's id as the key
         * and the request object as the value.
         *
         * @type {Object}
         */
        _requests: null,
    
        /**
         * This method is based on M.Object's design() but adds some request manager specific
         * features. It creates a new instance of M.RequestManager based on the given
         * configuration properties.
         *
         * @param obj
         * @returns {M.RequestManager}
         */
        init: function( obj ) {
            return this.design(obj);
        },
    
        /**
         * This method is used internally to process the configuration object for the request
         * manager before handing it to the design method. The job of this method is to make
         * sure that the configuration object fits the requirements of the design process.
         *
         * @param obj
         * @returns Object
         * @private
         */
        _normalize: function( obj ) {
            obj = obj && typeof obj === 'object' ? obj : {};
            obj.callbacks = obj.callbacks || {};
            obj.baseUrl = obj.baseUrl || obj.url;
    
            return obj;
        },
    
        /**
         * M.RequestManager's _init method.
         *
         * @private
         */
        _init: function() {
            /* throw exception if this is an instance of M.RequestManager and there is no URL given */
            if( Object.getPrototypeOf(this) === M.RequestManager && !this.baseUrl ) {
                throw M.Exception.NO_REQUEST_MANAGER_BASE_URL_SPECIFIED.getException();
            }
    
            /* setup the internally used requests hash map */
            this._requests = {};
    
            /* clean up the base url to not end with a '/' */
            if( this.baseUrl && this.baseUrl.lastIndexOf('/') === (this.baseUrl.length - 1) ) {
                this.baseUrl = this.baseUrl.substr(0, this.baseUrl.length - 1);
            }
    
            /* remove possible url property (was already mapped to baseUrl before) */
            if( this.url ) {
                delete this.url;
            }
    
            /* check for method and eventually set to GET (default) */
            this.method = this.method || 'GET';
    
            /* check for a timeout property and eventually remove it */
            if( typeof this.timeout !== 'number' || this.timeout < 0 ) {
                delete this.timeout;
            }
        },
    
        /**
         * This method initializes and then sends a request based on the request
         * manager's configuration and the given parameters object. If callbacks
         * are specified for this request handler (or via the passed configuration
         * object), those callbacks are handed over to the request and will be
         * called properly.
         *
         * @param obj
         * @returns {M.Request} The request that was sent.
         */
        doRequest: function( obj ) {
            obj = obj && typeof obj === 'object' ? obj : {};
    
            var request = M.Request.init({
                url: this.getUrl(obj),
                timeout: !isNaN(obj.timeout) ? obj.timeout : this.timeout,
                method: obj.method ? obj.method : this.method,
                data: obj.data ? obj.data : '',
                callbacks: {
                    beforeSend: {
                        target: this,
                        action: '_handleBeforeSend'
                    },
                    success: {
                        target: this,
                        action: '_handleSuccess'
                    },
                    error: {
                        target: this,
                        action: '_handleError'
                    }
                }
            });
    
            this._requests[request.getId()] = request;
    
            request.send();
    
            return request;
        },
    
        /**
         * This method returns the request's url based on the base url of the request
         * manager and a given path within the configuration object passed to the
         * doRequest() method.
         *
         * @param obj
         * @returns {String}
         */
        getUrl: function( obj ) {
            /* clean up the path to start a '/' */
            if( obj.path && obj.path[0] !== '/' ) {
                obj.path = '/' + obj.path;
            }
    
            return this.baseUrl + (obj.path ? obj.path : '');
        },
    
        /**
         * This method is used internally to handle the before send callbacks. It
         * automatically calls any registered before send handler.
         *
         * @param obj
         * @private
         */
        _handleBeforeSend: function( obj ) {
            this.handleCallback(this.callbacks.beforeSend, obj);
        },
    
        /**
         * This method is used internally to handle the success callbacks. It
         * automatically calls any registered success handler.
         *
         * @param obj
         * @private
         */
        _handleSuccess: function( obj ) {
            this.handleCallback(this.callbacks.success, obj);
    
            this.requestFinished(obj.id);
        },
    
        /**
         * This method is used internally to handle the error callbacks. It
         * automatically calls any registered error handler.
         *
         * @param obj
         * @private
         */
        _handleError: function( obj ) {
            this.handleCallback(this.callbacks.error, obj);
    
            this.requestFinished(obj.id);
        },
    
        requestFinished: function( id ) {
            if( this._requests && this._requests[id] ) {
                this._requests[id] = null;
                delete this._requests[id];
            }
        },
    
        /**
         * This method cancels a ongoing request based on its id.
         *
         * @param id
         */
        cancelRequest: function( id ) {
            if( this._requests && this._requests[id] ) {
                this._requests[id].cancel();
                this.requestFinished(id);
            }
        },
    
        /**
         * This method cancels all currently active requests of this request manager.
         */
        cancelAllRequest: function() {
            _.each(this._requests, function( request, id ) {
                this.cancelRequest(id);
            }, this);
        }
    
    });
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Frank
    // Date:      21.05.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * @class
     * @extends M.Object
     */
    M.SocketIO = M.Object.design(/** @scope M.SocketIO.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.SocketIO',
    
        /**
         * The host name of the socket.io server.
         *
         * @type String
         */
        host: '',
    
        /**
         * The path to the socket.io instance on the server.
         *
         * @type String
         */
        path: '',
    
        /**
         * The resource to the socket.io instance on the server.
         *
         * @type String
         */
        resource: '',
    
        /**
         * The path to the socket.io.js client script on the server.
         *
         * @type String
         */
        script: 'libs/socket.io.js',
    
        /**
         * This property is used to specifiy all events for a socket within an application.
         *
         * @type {Object}
         */
        events: null,
    
        /**
         * This property contains the socket connection.
         *
         * @type {Object}
         */
        _socket: null,
    
        /**
         * This property contains a socket's event handlers for all events.
         *
         * @type {Object}
         */
        _events: null,
    
        /**
         * This method is based on M.Object's extend() but adds some request specific features.
         * It creates a new instance of M.SocketIO based on the given configuration properties.
         *
         * @param obj
         * @returns {M.Request}
         */
        create: function( obj ) {
            return this.design(obj);
        },
    
        emit: function( event, data, callback ) {
            this._socket.emit(event, data, callback);
        },
    
        on: function( eventType, handler ) {
            var that = this;
            this._socket.on(eventType, function( data ) {
                that.handleCallback(handler, data);
            });
        },
    
        disconnect: function() {
            var that = this;
            if( this._socket ) {
                this._socket.removeAllListeners();
                this._socket.on('connect', function( data ) {
                    that.connected(data);
                });
                this._socket.on('disconnect', function( data ) {
                    that.disconnected(data);
                });
            }
            this._socket.disconnect();
        },
    
        connect: function( param ) {
            var that = this;
            var url = this.host; //  + '/'  + this.path;
            if( param ) {
                url += '?' + (_.isString(param) ? param : $.param(param));
            }
            var options = this.resource ? { resource: this.resource } : {};
            this._socket = io.connect(url, options);
            this._socket.on('connect', function( data ) {
                that.connected(data);
            });
            that._registerEvents();
        },
    
        ready: function() {
            this.connect();
        },
    
        error: function( message ) {
            console.log(message);
        },
    
        /**
         * This method returns the event handler of a certain event type of a socket.
         *
         * @param eventType
         * @returns {*}
         */
        getEventHandler: function( eventType ) {
            return this._events[eventType];
        },
    
        /**
         * M.SocketIO's _init method.
         *
         * @private
         */
        _init: function() {
            if( Object.getPrototypeOf(this) === M.SocketIO ) {
                this._initEvents();
                var x = x || {};
                if( typeof io === 'object' ) {
                    this.ready();
                } else {
                    console.log('Socket.IO not present !!');
                }
            }
        },
    
        /**
         * This method is used to init a socket's event lists.
         *
         * @private
         */
        _initEvents: function() {
            this.events = this.events || {};
            this._events = {};
    
            _.each(this.events, function( handler ) {
                this._addEvent(name, handler);
            }, this);
        },
    
        _addEvent: function( eventName, handler ) {
            if( _.isFunction(handler) ) {
                handler = { action: handler };
            }
            if( !handler.target ) {
                handler.target = this;
            }
            this._events[eventName] = handler;
        },
    
        /**
         * This method registers all socket's events.
         *
         * @private
         */
        _registerEvents: function() {
            var that = this;
            this._socket.on('disconnect', function( data ) {
                that.disconnect(data);
            });
            _.each(this._events, function( handler, eventType ) {
                this._socket.on(eventType, function( data ) {
                    that.handleCallback(handler, data);
                });
            }, this);
        },
    
        connected: function() {
    
        },
    
        disconnected: function() {
    
        }
    
    });
    
    
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Frank
    // Date:      13.04.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * Field describing a data attribute
     *
     * contains functions to comperate, detect and convert data type
     *
     * @param options
     * @constructor
     */
    M.Field = function (options) {
        this.merge(options);
        this.initialize.apply(this, arguments);
    };
    
    M.Field.extend = M.extend;
    M.Field.create = M.create;
    M.Field.design = M.design;
    
    _.extend(M.Field.prototype, M.Object, {
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Field',
    
        name: null,
    
        type: null,
    
        index: null,
    
        defaultValue: undefined,
    
        length: null,
    
        required: NO,
    
        persistent: YES,
    
        initialize: function () {
        },
    
        /**
         * merge field properties into this instance
         *
         * @param obj
         */
        merge: function (obj) {
            obj = _.isString(obj) ? { type: obj } : (obj || {});
    
            this.name = !_.isUndefined(obj.name) ? obj.name : this.name;
            this.type = !_.isUndefined(obj.type) ? obj.type : this.type;
            this.index = !_.isUndefined(obj.index) ? obj.index : this.index;
            this.defaultValue = !_.isUndefined(obj.defaultValue) ? obj.defaultValue : this.defaultValue;
            this.length = !_.isUndefined(obj.length) ? obj.length : this.length;
            this.required = !_.isUndefined(obj.required) ? obj.required : this.required;
            this.persistent = !_.isUndefined(obj.persistent) ? obj.persistent : this.persistent;
        },
    
        /**
         * converts the give value into the required data type
         *
         * @param value
         * @param type
         * @returns {*}
         */
        transform: function (value, type) {
            type = type || this.type;
            try {
                if (_.isUndefined(value)) {
                    return this.defaultValue;
                }
                if (type === M.CONST.TYPE.STRING || type === M.CONST.TYPE.TEXT) {
                    if (_.isObject(value)) {
                        return JSON.stringify(value);
                    } else {
                        return _.isNull(value) ? 'null' : value.toString();
                    }
                } else if (type === M.CONST.TYPE.INTEGER) {
                    return parseInt(value);
                } else if (type === M.CONST.TYPE.BOOLEAN) {
                    return value === true || value === 'true'; // true, 1, "1" or "true"
                } else if (type === M.CONST.TYPE.FLOAT) {
                    return parseFloat(value);
                } else if (type === M.CONST.TYPE.OBJECT || type === M.CONST.TYPE.ARRAY) {
                    if (!_.isObject(value)) {
                        return _.isString(value) ? JSON.parse(value) : null;
                    }
                } else if (type === M.CONST.TYPE.DATE) {
                    if (!M.Date.isPrototypeOf(value)) {
                        var date = value ? M.Date.create(value) : null;
                        return date && date.isValid() ? date : null;
                    }
                } else if (type === M.CONST.TYPE.OBJECTID) {
                    if (!M.ObjectID.prototype.isPrototypeOf(value)) {
                        return _.isString(value) ? new M.ObjectID(value) : null;
                    }
                }
                return value;
            } catch (e) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Failed converting value! ' + e.message);
            }
        },
    
        /**
         * check to values to be equal for the type of this field
         *
         * @param a
         * @param b
         * @returns {*}
         */
        equals: function (a, b) {
            var v1 = this.transform(a);
            var v2 = this.transform(b);
            return this._equals(v1, v2, _.isArray(v1));
        },
    
        /**
         * check if this field holds binary data
         *
         * @param obj
         * @returns {boolean|*}
         */
        isBinary: function (obj) {
            return (typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array) || (obj && obj.$Uint8ArrayPolyfill);
        },
    
        /**
         * detect the type of a given value
         *
         * @param v
         * @returns {*}
         */
        detectType: function (v) {
            if (_.isNumber(v)) {
                return M.CONST.TYPE.FLOAT;
            }
            if (_.isString(v)) {
                return M.CONST.TYPE.STRING;
            }
            if (_.isBoolean(v)) {
                return M.CONST.TYPE.BOOLEAN;
            }
            if (_.isArray(v)) {
                return M.CONST.TYPE.ARRAY;
            }
            if (_.isNull(v)) {
                return M.CONST.TYPE.NULL;
            }
            if (_.isDate(v) || M.Date.isPrototypeOf(v)) {
                return M.CONST.TYPE.DATE;
            }
            if (M.ObjectID.prototype.isPrototypeOf(v)) {
                return M.CONST.TYPE.OBJECTID;
            }
            if (this.isBinary(v)) {
                return M.CONST.TYPE.BINARY;
            }
            return M.CONST.TYPE.OBJECT;
        },
    
        /**
         * returns the sort order for the given type, used by sorting different type
         * 
         * @param type
         * @returns {number}
         */
        typeOrder: function (type) {
            switch (type) {
                case M.CONST.TYPE.NULL   :
                    return 0;
                case M.CONST.TYPE.FLOAT  :
                    return 1;
                case M.CONST.TYPE.STRING :
                    return 2;
                case M.CONST.TYPE.OBJECT :
                    return 3;
                case M.CONST.TYPE.ARRAY  :
                    return 4;
                case M.CONST.TYPE.BINARY :
                    return 5;
                case M.CONST.TYPE.DATE   :
                    return 6;
            }
            return -1;
        },
    
        _equals: function (a, b, keyOrderSensitive) {
            var that = this;
            var i;
            if (a === b) {
                return true;
            }
            if (!a || !b) { // if either one is false, they'd have to be === to be equal
                return false;
            }
            if (!(_.isObject(a) && _.isObject(b))) {
                return false;
            }
            if (a instanceof Date && b instanceof Date) {
                return a.valueOf() === b.valueOf();
            }
            if (this.isBinary(a) && this.isBinary(b)) {
                if (a.length !== b.length) {
                    return false;
                }
                for (i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) {
                        return false;
                    }
                }
                return true;
            }
            if (_.isFunction(a.equals)) {
                return a.equals(b);
            }
            if (_.isArray(a)) {
                if (!_.isArray(b)) {
                    return false;
                }
                if (a.length !== b.length) {
                    return false;
                }
                for (i = 0; i < a.length; i++) {
                    if (!that.equals(a[i], b[i], keyOrderSensitive)) {
                        return false;
                    }
                }
                return true;
            }
            // fall back to structural equality of objects
            var ret;
            if (keyOrderSensitive) {
                var bKeys = [];
                _.each(b, function (val, x) {
                    bKeys.push(x);
                });
                i = 0;
                ret = _.all(a, function (val, x) {
                    if (i >= bKeys.length) {
                        return false;
                    }
                    if (x !== bKeys[i]) {
                        return false;
                    }
                    if (!that.equals(val, b[bKeys[i]], keyOrderSensitive)) {
                        return false;
                    }
                    i++;
                    return true;
                });
                return ret && i === bKeys.length;
            } else {
                i = 0;
                ret = _.all(a, function (val, key) {
                    if (!_.has(b, key)) {
                        return false;
                    }
                    if (!that.equals(val, b[key], keyOrderSensitive)) {
                        return false;
                    }
                    i++;
                    return true;
                });
                return ret && _.size(b) === i;
            }
        },
    
        /**
         * compare two values of unknown type according to BSON ordering
         * semantics. (as an extension, consider 'undefined' to be less than
         * any other value.) return negative if a is less, positive if b is
         * less, or 0 if equal
         *
         * @param a
         * @param b
         * @returns {*}
         * @private
         */
        _cmp: function (a, b) {
            if (a === undefined) {
                return b === undefined ? 0 : -1;
            }
            if (b === undefined) {
                return 1;
            }
            var i = 0;
            var ta = this.detectType(a);
            var tb = this.detectType(b);
            var oa = this.typeOrder(ta);
            var ob = this.typeOrder(tb);
            if (oa !== ob) {
                return oa < ob ? -1 : 1;
            }
            if (ta !== tb) {
                throw new Error('Missing type coercion logic in _cmp');
            }
            if (ta === 7) { // ObjectID
                // Convert to string.
                ta = tb = 2;
                a = a.toHexString();
                b = b.toHexString();
            }
            if (ta === M.CONST.TYPE.DATE) {
                // Convert to millis.
                ta = tb = 1;
                a = a.getTime();
                b = b.getTime();
            }
            if (ta === M.CONST.TYPE.FLOAT) {
                return a - b;
            }
            if (tb === M.CONST.TYPE.STRING) {
                return a < b ? -1 : (a === b ? 0 : 1);
            }
            if (ta === M.CONST.TYPE.OBJECT) {
                // this could be much more efficient in the expected case ...
                var toArray = function (obj) {
                    var ret = [];
                    for (var key in obj) {
                        ret.push(key);
                        ret.push(obj[key]);
                    }
                    return ret;
                };
                return this._cmp(toArray(a), toArray(b));
            }
            if (ta === M.CONST.TYPE.ARRAY) { // Array
                for (i = 0; ; i++) {
                    if (i === a.length) {
                        return (i === b.length) ? 0 : -1;
                    }
                    if (i === b.length) {
                        return 1;
                    }
                    var s = this._cmp(a[i], b[i]);
                    if (s !== 0) {
                        return s;
                    }
                }
            }
            if (ta === M.CONST.TYPE.BINARY) {
                if (a.length !== b.length) {
                    return a.length - b.length;
                }
                for (i = 0; i < a.length; i++) {
                    if (a[i] < b[i]) {
                        return -1;
                    }
                    if (a[i] > b[i]) {
                        return 1;
                    }
                }
                return 0;
            }
            if (ta === M.CONST.TYPE.BOOLEAN) {
                if (a) {
                    return b ? 0 : 1;
                }
                return b ? -1 : 0;
            }
            if (ta === M.CONST.TYPE.NULL) {
                return 0;
            }
    //        if( ta === M.CONST.TYPE.REGEXP ) {
    //            throw Error("Sorting not supported on regular expression");
    //        } // XXX
    //        if( ta === 13 ) // javascript code
    //        {
    //            throw Error("Sorting not supported on Javascript code");
    //        } // XXX
            throw new Error('Unknown type to sort');
        }
    });
    
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Frank
    // Date:      13.04.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    M.Entity = function (options) {
        var fields = this.fields;
        this.fields = {};
        this._mergeFields(fields);
        options = options || {};
        if (options.fields) {
            this._mergeFields(options.fields);
        }
        this.typeMapping = options.typeMapping || this.typeMapping;
        this.collection = options.collection || this.collection;
        var model = options.model || (this.collection ? this.collection.prototype.model : null);
        this.idAttribute = options.idAttribute || this.idAttribute || (model ? model.prototype.idAttribute : '');
        this._updateFields(this.typeMapping);
        this.initialize.apply(this, arguments);
    };
    
    M.Entity.from = function (entity, options) {
        // is not an instance of M.Entity
        if (!M.Entity.prototype.isPrototypeOf(entity)) {
            // if this is a prototype of an entity, create an instance
            if (_.isFunction(entity) &&
                M.Entity.prototype.isPrototypeOf(entity.prototype)) {
                var Entity = entity;
                entity = new Entity(options);
            } else {
                if (typeof entity === 'string') {
                    entity = {
                        name: entity
                    };
                }
                // if this is just a config create a new Entity
                var E = M.Entity.extend(entity);
                entity = new E(options);
            }
        } else if (options && options.typeMapping) {
            entity._updateFields(options.typeMapping);
        }
        return entity;
    };
    
    M.Entity.extend = M.extend;
    M.Entity.create = M.create;
    M.Entity.design = M.design;
    
    _.extend(M.Entity.prototype, M.Object, {
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Entity',
    
        name: '',
    
        idAttribute: '',
    
        collection: null,
    
        model: null,
    
        fields: {},
    
        initialize: function () {
        },
    
        getFields: function () {
            return this.fields;
        },
    
        getField: function (fieldKey) {
            return this.fields[fieldKey];
        },
    
        getFieldName: function (fieldKey) {
            var field = this.getField(fieldKey);
            return field && field.name ? field.name : fieldKey;
        },
    
        getKey: function () {
            return this.idAttribute || M.Model.idAttribute;
        },
    
        getKeys: function () {
            return this.splitKey(this.getKey());
        },
    
        /**
         * Splits a comma separated list of keys to a key array
         *
         * @returns {Array} array of keys
         */
        splitKey: function (key) {
            var keys = [];
            if (_.isString(key)) {
                _.each(key.split(','), function (key) {
                    var k = key.trim();
                    if (k) {
                        keys.push(k);
                    }
                });
            }
            return keys;
        },
    
        _mergeFields: function (newFields) {
            if (!_.isObject(this.fields)) {
                this.fields = {};
            }
            var that = this;
            if (_.isObject(newFields)) {
                _.each(newFields, function (value, key) {
                    if (!that.fields[key]) {
                        that.fields[key] = new M.Field(value);
                    } else {
                        that.fields[key].merge(value);
                    }
                });
            }
        },
    
        _updateFields: function (typeMapping) {
            var that = this;
            _.each(this.fields, function (value, key) {
                // remove unused properties
                if (value.persistent === NO) {
                    delete that.fields[key];
                } else {
                    // add missing names
                    if (!value.name) {
                        value.name = key;
                    }
                    // apply default type conversions
                    if (typeMapping && typeMapping[value.type]) {
                        value.type = typeMapping[value.type];
                    }
                }
            });
        },
    
        toAttributes: function (data, id, fields) {
            fields = fields || this.fields;
            if (data && !_.isEmpty(fields)) {
                // map field names
                var value, attributes = {};
                _.each(fields, function (field, key) {
                    value = _.isFunction(data.get) ? data.get(field.name) : data[field.name];
                    attributes[key] = value;
                });
                return attributes;
            }
            return data;
        },
    
        fromAttributes: function (attrs, fields) {
            fields = fields || this.fields;
            if (attrs && !_.isEmpty(fields)) {
                var data = {};
                _.each(fields, function (field, key) {
                    var value = _.isFunction(attrs.get) ? attrs.get(key) : attrs[key];
                    value = field.transform(value);
                    if (!_.isUndefined(value)) {
                        data[field.name] = value;
                    }
                });
                return data;
            }
            return attrs;
        },
    
        setId: function (attrs, id) {
            if (attrs && id) {
                var key = this.getKey() || attrs.idAttribute;
                if (key) {
                    if (_.isFunction(attrs.set)) {
                        attrs.set(key, id);
                    } else {
                        attrs[key] = id;
                    }
                }
            }
            return attrs;
        },
    
        getId: function (attrs) {
            if (attrs) {
                var key = this.getKey() || attrs.idAttribute;
                if (key) {
                    return _.isFunction(attrs.get) ? attrs.get(key) : attrs[key];
                }
            }
        }
    });
    
    M.Security = {
    
    
        logon: function (options, callback) {
            var credentials = options ? options.credentials : null;
            if (credentials) {
                switch (credentials.type) {
                    case 'basic':
                        return this.logonBasicAuth(options, callback);
                    case 'mcap':
                        return this.logonMcapAuth(options, callback);
                }
            }
            callback();
        },
    
        logonBasicAuth: function (options, callback) {
            var credentials = options.credentials;
            options.beforeSend = function (xhr) {
                M.Request.setAuthentication(xhr, credentials);
            };
            callback();
        },
    
        logonMcapAuth: function (options, callback) {
            var credentials = options.credentials;
            if (credentials) {
                options.beforeSend = function (xhr) {
                    if (credentials.cookie) {
                        xhr.setRequestHeader('JSESSIONID', credentials.cookie);
                    }
                };
                if (!credentials.cookie) {
                    var host = this.getHost(options);
                    Backbone.ajax({
                        url: host + '/gofer/security-login' +
                            '?j_username=' + credentials.username +
                            '&j_password=' + credentials.password +
                            '&j_organization=system',
                        success: function (result) {
                            var m = document.cookie.match(/JSESSIONID=([^;]*)/);
                            credentials.cookie = (m && m.length > 1) ? m[1] : '.';
                            callback(result);
                        },
                        error: function (error) {
                            credentials.cookie = '.';
                            callback(error);
                        }
                    });
                } else {
                    callback();
                }
            }
        },
    
        getHost: function (options) {
            if (options.credentials && options.credentials.host) {
                return options.credentials.host;
            } else if (options.host) {
                return options.host;
            } else if (options.url) {
                var href = M.Request.getLocation(options.url);
                return href.protocol + '//' + href.host;
            }
            return '';
        }
    
    };
    M.Model = Backbone.Model.extend({
        constructor: function (attributes, options) {
            this.init(attributes, options);
            Backbone.Model.apply(this, arguments);
        }
    });
    
    M.Model.create = M.create;
    M.Model.design = M.design;
    
    _.extend(M.Model.prototype, M.Object, {
    
        _type: 'M.Model',
    
        isModel: YES,
    
        entity: null,
    
        defaults: {},
    
        changedSinceSync: {},
    
        init: function (attributes, options) {
            options = options || {};
    
            this.collection = options.collection || this.collection;
            this.idAttribute = options.idAttribute || this.idAttribute;
            this.store = this.store || (this.collection ? this.collection.store : null) || options.store;
            if (this.store && _.isFunction(this.store.initModel)) {
                this.store.initModel(this, options);
            }
            this.entity = this.entity || (this.collection ? this.collection.entity : null) || options.entity;
            if (this.entity) {
                this.entity = M.Entity.from(this.entity, { model: this.constructor, typeMapping: options.typeMapping });
                this.idAttribute = this.entity.idAttribute || this.idAttribute;
            }
            this.credentials = this.credentials || (this.collection ? this.collection.credentials : null) || options.credentials;
            this.on('change', this.onChange, this);
            this.on('sync', this.onSync, this);
        },
    
        sync: function (method, model, options) {
            var store = (options ? options.store : null) || this.store;
            if (store && _.isFunction(store.sync)) {
                // Ensure that we have the appropriate request data.
                return store.sync.apply(this, arguments);
            } else {
                var that = this;
                var args = arguments;
                options = options || {};
                options.credentials = options.credentials || this.credentials;
                M.Security.logon(options, function (result) {
                    return Backbone.sync.apply(that, args);
                });
            }
        },
    
        onChange: function (model, options) {
            // For each `set` attribute, update or delete the current value.
            var attrs = model.changedAttributes();
            if (_.isObject(attrs)) {
                for (var key in attrs) {
                    this.changedSinceSync[key] = attrs[key];
                }
            }
        },
    
        onSync: function (model, options) {
            this.changedSinceSync = {};
        },
    
        getUrlRoot: function () {
            if (this.urlRoot) {
                return _.isFunction(this.urlRoot) ? this.urlRoot() : this.urlRoot;
            } else if (this.collection) {
                return this.collection.getUrlRoot();
            } else if (this.url) {
                var url = _.isFunction(this.url) ? this.url() : this.url;
                if (url && this.id && url.indexOf(this.id) > 0) {
                    return url.substr(0, url.indexOf(this.id));
                }
                return url;
            }
        },
    
        toJSON: function (options) {
            options = options || {};
            var entity = options.entity || this.entity;
            if (M.isEntity(entity)) {
                return entity.fromAttributes(options.attrs || this.attributes);
            }
            return options.attrs || _.clone(this.attributes);
        },
    
        parse: function (resp, options) {
            options = options || {};
            var entity = options.entity || this.entity;
            if (M.isEntity(entity)) {
                return entity.toAttributes(resp);
            }
            return resp;
        }
    
    });
    
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Frank
    // Date:      02.04.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    M.Collection = Backbone.Collection.extend({
    
        constructor: function (options) {
            this.init(options);
            Backbone.Collection.apply(this, arguments);
        }
    });
    
    M.Collection.create = M.create;
    M.Collection.design = M.design;
    
    _.extend(M.Collection.prototype, M.Object, {
    
        _type: 'M.Collection',
    
        isCollection: YES,
    
        model: M.Model,
    
        entity: null,
    
        options: null,
    
        init: function (options) {
            options = options || {};
            this.store = options.store || this.store || (this.model ? this.model.prototype.store : null);
            this.entity = options.entity || this.entity || (this.model ? this.model.prototype.entity : null);
            this.options = options.options || this.options;
    
            var entity = this.entity || this.entityFromUrl(this.url);
            if (entity) {
                this.entity = M.Entity.from(entity, { model: this.model, typeMapping: options.typeMapping });
            }
            this._updateUrl();
    
            if (this.store && _.isFunction(this.store.initCollection)) {
                this.store.initCollection(this, options);
            }
        },
    
        entityFromUrl: function (url) {
            if (url) {
                // extract last path part as entity name
                var parts = M.Request.getLocation(this.url).pathname.match(/([^\/]+)\/?$/);
                if (parts && parts.length > 1) {
                    return parts[1];
                }
            }
        },
    
        sort: function (options) {
            if (_.isObject(options && options.sort)) {
                this.comparator = M.DataSelector.compileSort(options.sort);
            }
            Backbone.Collection.prototype.sort.apply(this, arguments);
        },
    
        select: function (options) {
            var selector = options && options.query ? M.DataSelector.create(options.query) : null;
            var collection = M.Collection.create(null, { model: this.model });
    
            if (options && options.sort) {
                collection.comparator = M.DataSelector.compileSort(options.sort);
            }
    
            this.each(function (model) {
                if (!selector || selector.matches(model.attributes)) {
                    collection.add(model);
                }
            });
            return collection;
        },
    
        destroy: function (options) {
            var success = options.success;
            if (this.length > 0) {
                options.success = function () {
                    if (this.length === 0 && success) {
                        success();
                    }
                };
                var model;
                while ((model = this.first())) {
                    this.sync('delete', model, options);
                    this.remove(model);
                }
            } else if (success) {
                success();
            }
        },
    
        sync: function (method, model, options) {
            var store = (options ? options.store : null) || this.store;
            if (store && _.isFunction(store.sync)) {
                return store.sync.apply(this, arguments);
            } else {
                var that = this;
                var args = arguments;
                options = options || {};
                options.credentials = options.credentials || this.credentials;
                M.Security.logon(options, function (result) {
                    return Backbone.sync.apply(that, args);
                });
            }
        },
    
        _updateUrl: function () {
            var params = this.getUrlParams();
            if (this.options) {
                this.url = this.getUrlRoot();
                if (this.options.query) {
                    params.query = encodeURIComponent(JSON.stringify(this.options.query));
                }
                if (this.options.fields) {
                    params.fields = encodeURIComponent(JSON.stringify(this.options.fields));
                }
                if (this.options.sort) {
                    params.sort = encodeURIComponent(JSON.stringify(this.options.sort));
                }
                if (!_.isEmpty(params)) {
                    this.url += '?';
                    var a = [];
                    for (var k in params) {
                        a.push(k + (params[k] ? '=' + params[k] : ''));
                    }
                    this.url += a.join('&');
                }
            }
        },
    
        getUrlParams: function (url) {
            url = url || this.getUrl();
            var m = url.match(/\?([^#]*)/);
            var params = {};
            if (m && m.length > 1) {
                _.each(m[1].split('&'), function (p) {
                    var a = p.split('=');
                    params[a[0]] = a[1];
                });
            }
            return params;
        },
    
        getUrl: function (collection) {
            return (_.isFunction(this.url) ? this.url() : this.url) || '';
        },
    
        getUrlRoot: function () {
            var url = this.getUrl();
            return url ? ( url.indexOf('?') >= 0 ? url.substr(0, url.indexOf('?')) : url) : '';
        },
    
        applyFilter: function (callback) {
            this.trigger('filter', this.filter(callback));
        }
    
    });
    
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Frank
    // Date:      14.04.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    // ===========================================================================
    //
    // M.DataSelector uses code from meteor.js
    // https://github.com/meteor/meteor/tree/master/packages/minimongo
    //
    // Thanks for sharing!
    //
    // ===========================================================================
    
    M.DataSelector = M.Object.design({
    
        _type: 'M.DataSelector',
    
        _selector: null,
    
        create: function (docSelector) {
            var selector = this.design({
                _selector: null
            });
            selector.init(docSelector);
            return selector;
        },
    
        init: function (docSelector) {
            this._selector = this.compileSelector(docSelector);
        },
    
        matches: function (value) {
            if (_.isFunction(this._selector)) {
                return this._selector(value);
            }
            return false;
        },
    
        hasOperators: function (valueSelector) {
            var theseAreOperators;
            for (var selKey in valueSelector) {
                var thisIsOperator = selKey.substr(0, 1) === '$';
                if (theseAreOperators === undefined) {
                    theseAreOperators = thisIsOperator;
                } else if (theseAreOperators !== thisIsOperator) {
                    throw new Error('Inconsistent selector: ' + valueSelector);
                }
            }
            return !!theseAreOperators;  // {} has no operators
        },
    
        // Given a selector, return a function that takes one argument, a
        // document, and returns true if the document matches the selector,
        // else false.
        compileSelector: function (selector) {
            // you can pass a literal function instead of a selector
            if ( _.isFunction(selector)) {
                return function (doc) {
                    return selector.call(doc);
                };
            }
    
            // shorthand -- scalars match _id
            if (this._selectorIsId(selector)) {
                return function (record) {
                    var id = _.isFunction(record.getId) ? record.getId() : (record._id || record.id);
                    return M.Field.prototype.equals(id, selector);
                };
            }
    
            // protect against dangerous selectors.  falsey and {_id: falsey} are both
            // likely programmer error, and not what you want, particularly for
            // destructive operations.
            if (!selector || (('_id' in selector) && !selector._id)) {
                return function (doc) {
                    return false;
                };
            }
    
            // Top level can't be an array or true or binary.
            if (_.isBoolean(selector) || _.isArray(selector) || M.Field.prototype.isBinary(selector)) {
                throw new Error('Invalid selector: ' + selector);
            }
    
            return this.compileDocSelector(selector);
        },
    
        // The main compilation function for a given selector.
        compileDocSelector: function (docSelector) {
            var that = M.DataSelector;
            var perKeySelectors = [];
            _.each(docSelector, function (subSelector, key) {
                if (key.substr(0, 1) === '$') {
                    // Outer operators are either logical operators (they recurse back into
                    // this function), or $where.
                    if (!_.has(that.LOGICAL_OPERATORS, key)) {
                        throw new Error('Unrecognized logical operator: ' + key);
                    }
                    perKeySelectors.push(that.LOGICAL_OPERATORS[key](subSelector));
                } else {
                    var lookUpByIndex = that._makeLookupFunction(key);
                    var valueSelectorFunc = that.compileValueSelector(subSelector);
                    perKeySelectors.push(function (doc) {
                        var branchValues = lookUpByIndex(doc);
                        // We apply the selector to each 'branched' value and return true if any
                        // match. This isn't 100% consistent with MongoDB; eg, see:
                        // https://jira.mongodb.org/browse/SERVER-8585
                        return _.any(branchValues, valueSelectorFunc);
                    });
                }
            });
    
            return function (record) {
                var doc = _.isFunction(record.getData) ? record.getData() : record;
                return _.all(perKeySelectors, function (f) {
                    return f(doc);
                });
            };
        },
    
        compileValueSelector: function (valueSelector) {
            var that = M.DataSelector;
            if (valueSelector === null) {  // undefined or null
                return function (value) {
                    return that._anyIfArray(value, function (x) {
                        return x === null;  // undefined or null
                    });
                };
            }
    
            // Selector is a non-null primitive (and not an array or RegExp either).
            if (!_.isObject(valueSelector)) {
                return function (value) {
                    return that._anyIfArray(value, function (x) {
                        return x === valueSelector;
                    });
                };
            }
    
            if (_.isRegExp(valueSelector)) {
                return function (value) {
                    if (_.isUndefined(value)) {
                        return false;
                    }
                    return that._anyIfArray(value, function (x) {
                        return valueSelector.test(x);
                    });
                };
            }
    
            // Arrays match either identical arrays or arrays that contain it as a value.
            if (_.isArray(valueSelector)) {
                return function (value) {
                    if (!_.isArray(value)) {
                        return false;
                    }
                    return that._anyIfArrayPlus(value, function (x) {
                        return that._equal(valueSelector, x);
                    });
                };
            }
    
            // It's an object, but not an array or regexp.
            if (this.hasOperators(valueSelector)) {
                var operatorFunctions = [];
                _.each(valueSelector, function (operand, operator) {
                    if (!_.has(that.VALUE_OPERATORS, operator)) {
                        throw new Error('Unrecognized operator: ' + operator);
                    }
                    operatorFunctions.push(that.VALUE_OPERATORS[operator](operand, valueSelector.$options));
                });
                return function (value) {
                    return _.all(operatorFunctions, function (f) {
                        return f(value);
                    });
                };
            }
    
            // It's a literal; compare value (or element of value array) directly to the
            // selector.
            return function (value) {
                return that._anyIfArray(value, function (x) {
                    return that._equal(valueSelector, x);
                });
            };
        },
    
        // _makeLookupFunction(key) returns a lookup function.
        //
        // A lookup function takes in a document and returns an array of matching
        // values.  This array has more than one element if any segment of the key other
        // than the last one is an array.  ie, any arrays found when doing non-final
        // lookups result in this function 'branching'; each element in the returned
        // array represents the value found at this branch. If any branch doesn't have a
        // final value for the full key, its element in the returned list will be
        // undefined. It always returns a non-empty array.
        //
        // _makeLookupFunction('a.x')({a: {x: 1}}) returns [1]
        // _makeLookupFunction('a.x')({a: {x: [1]}}) returns [[1]]
        // _makeLookupFunction('a.x')({a: 5})  returns [undefined]
        // _makeLookupFunction('a.x')({a: [{x: 1},
        //                                 {x: [2]},
        //                                 {y: 3}]})
        //   returns [1, [2], undefined]
        _makeLookupFunction: function (key) {
            var dotLocation = key.indexOf('.');
            var first, lookupRest, nextIsNumeric;
            if (dotLocation === -1) {
                first = key;
            } else {
                first = key.substr(0, dotLocation);
                var rest = key.substr(dotLocation + 1);
                lookupRest = this._makeLookupFunction(rest);
                // Is the next (perhaps final) piece numeric (ie, an array lookup?)
                nextIsNumeric = /^\d+(\.|$)/.test(rest);
            }
    
            return function (doc) {
                if (doc === null) { // null or undefined
                    return [undefined];
                }
                var firstLevel = doc[first];
    
                // We don't 'branch' at the final level.
                if (!lookupRest) {
                    return [firstLevel];
                }
    
                // It's an empty array, and we're not done: we won't find anything.
                if (_.isArray(firstLevel) && firstLevel.length === 0) {
                    return [undefined];
                }
    
                // For each result at this level, finish the lookup on the rest of the key,
                // and return everything we find. Also, if the next result is a number,
                // don't branch here.
                //
                // Technically, in MongoDB, we should be able to handle the case where
                // objects have numeric keys, but Mongo doesn't actually handle this
                // consistently yet itself, see eg
                // https://jira.mongodb.org/browse/SERVER-2898
                // https://github.com/mongodb/mongo/blob/master/jstests/array_match2.js
                if (!_.isArray(firstLevel) || nextIsNumeric) {
                    firstLevel = [firstLevel];
                }
                return Array.prototype.concat.apply([], _.map(firstLevel, lookupRest));
            };
        },
    
        _anyIfArray: function (x, f) {
            if (_.isArray(x)) {
                return _.any(x, f);
            }
            return f(x);
        },
    
        _anyIfArrayPlus: function (x, f) {
            if (f(x)) {
                return true;
            }
            return _.isArray(x) && _.any(x, f);
        },
    
        // Is this selector just shorthand for lookup by _id?
        _selectorIsId: function (selector) {
            return _.isString(selector) || _.isNumber(selector);
        },
    
        // deep equality test: use for literal document and array matches
        _equal: function (a, b) {
            return M.Field.prototype._equals(a, b, true);
        },
    
        _cmp: function (a, b) {
            return M.Field.prototype._cmp(a, b);
        },
    
        LOGICAL_OPERATORS: {
            '$and': function (subSelector) {
                if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                    throw new Error('$and/$or/$nor must be nonempty array');
                }
                var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
                return function (doc) {
                    return _.all(subSelectorFunctions, function (f) {
                        return f(doc);
                    });
                };
            },
    
            '$or': function (subSelector) {
                if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                    throw new Error('$and/$or/$nor must be nonempty array');
                }
                var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
                return function (doc) {
                    return _.any(subSelectorFunctions, function (f) {
                        return f(doc);
                    });
                };
            },
    
            '$nor': function (subSelector) {
                if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                    throw new Error('$and/$or/$nor must be nonempty array');
                }
                var subSelectorFunctions = _.map(subSelector, M.DataSelector.compileDocSelector);
                return function (doc) {
                    return _.all(subSelectorFunctions, function (f) {
                        return !f(doc);
                    });
                };
            },
    
            '$where': function (selectorValue) {
                if (!_.isFunction(selectorValue)) {
                    var value = selectorValue;
                    selectorValue = function() { return value; };
                }
                return function (doc) {
                    return selectorValue.call(doc);
                };
            }
        },
    
        VALUE_OPERATORS: {
            '$in': function (operand) {
                if (!_.isArray(operand)) {
                    throw new Error('Argument to $in must be array');
                }
                return function (value) {
                    return M.DataSelector._anyIfArrayPlus(value, function (x) {
                        return _.any(operand, function (operandElt) {
                            return M.DataSelector._equal(operandElt, x);
                        });
                    });
                };
            },
    
            '$all': function (operand) {
                if (!_.isArray(operand)) {
                    throw new Error('Argument to $all must be array');
                }
                return function (value) {
                    if (!_.isArray(value)) {
                        return false;
                    }
                    return _.all(operand, function (operandElt) {
                        return _.any(value, function (valueElt) {
                            return M.DataSelector._equal(operandElt, valueElt);
                        });
                    });
                };
            },
    
            '$lt': function (operand) {
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.DataSelector._cmp(x, operand) < 0;
                    });
                };
            },
    
            '$lte': function (operand) {
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.DataSelector._cmp(x, operand) <= 0;
                    });
                };
            },
    
            '$gt': function (operand) {
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.DataSelector._cmp(x, operand) > 0;
                    });
                };
            },
    
            '$gte': function (operand) {
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.DataSelector._cmp(x, operand) >= 0;
                    });
                };
            },
    
            '$ne': function (operand) {
                return function (value) {
                    return !M.DataSelector._anyIfArrayPlus(value, function (x) {
                        return M.DataSelector._equal(x, operand);
                    });
                };
            },
    
            '$nin': function (operand) {
                if (!_.isArray(operand)) {
                    throw new Error('Argument to $nin must be array');
                }
                var inFunction = this.VALUE_OPERATORS.$in(operand);
                return function (value) {
                    // Field doesn't exist, so it's not-in operand
                    if (value === undefined) {
                        return true;
                    }
                    return !inFunction(value);
                };
            },
    
            '$exists': function (operand) {
                return function (value) {
                    return operand === (value !== undefined);
                };
            },
            '$mod': function (operand) {
                var divisor = operand[0], remainder = operand[1];
                return function (value) {
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return x % divisor === remainder;
                    });
                };
            },
    
            '$size': function (operand) {
                return function (value) {
                    return _.isArray(value) && operand === value.length;
                };
            },
    
            '$type': function (operand) {
                return function (value) {
                    // A nonexistent field is of no type.
                    if (_.isUndefined(value)) {
                        return false;
                    }
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return M.Field.prototype.detectType(x) === operand;
                    });
                };
            },
    
            '$regex': function (operand, options) {
    
                if (_.isUndefined(options)) {
                    // Options passed in $options (even the empty string) always overrides
                    // options in the RegExp object itself.
    
                    // Be clear that we only support the JS-supported options, not extended
                    // ones (eg, Mongo supports x and s). Ideally we would implement x and s
                    // by transforming the regexp, but not today...
                    if (/[^gim]/.test(options)) {
                        throw new Error('Only the i, m, and g regexp options are supported');
                    }
    
                    var regexSource = _.isRegExp(operand) ? operand.source : operand;
                    operand = new RegExp(regexSource, options);
                } else if (!_.isRegExp(operand)) {
                    operand = new RegExp(operand);
                }
    
                return function (value) {
                    if (_.isUndefined(value)) {
                        return false;
                    }
                    return M.DataSelector._anyIfArray(value, function (x) {
                        return operand.test(x);
                    });
                };
            },
    
            '$options': function (operand) {
                // evaluation happens at the $regex function above
                return function (value) {
                    return true;
                };
            },
    
            '$elemMatch': function (operand) {
                var matcher = M.DataSelector.compileDocSelector(operand);
                return function (value) {
                    if (!_.isArray(value)) {
                        return false;
                    }
                    return _.any(value, function (x) {
                        return matcher(x);
                    });
                };
            },
    
            '$not': function (operand) {
                var matcher = M.DataSelector.compileDocSelector(operand);
                return function (value) {
                    return !matcher(value);
                };
            }
        },
    
        // Give a sort spec, which can be in any of these forms:
        //   {'key1': 1, 'key2': -1}
        //   [['key1', 'asc'], ['key2', 'desc']]
        //   ['key1', ['key2', 'desc']]
        //
        // (.. with the first form being dependent on the key enumeration
        // behavior of your javascript VM, which usually does what you mean in
        // this case if the key names don't look like integers ..)
        //
        // return a function that takes two objects, and returns -1 if the
        // first object comes first in order, 1 if the second object comes
        // first, or 0 if neither object comes before the other.
    
        compileSort: function (spec) {
            var sortSpecParts = [];
    
            if (_.isArray(spec)) {
                for (var i = 0; i < spec.length; i++) {
                    if (typeof spec[i] === 'string') {
                        sortSpecParts.push({
                            lookup: this._makeLookupFunction(spec[i]),
                            ascending: true
                        });
                    } else {
                        sortSpecParts.push({
                            lookup: this._makeLookupFunction(spec[i][0]),
                            ascending: spec[i][1] !== 'desc'
                        });
                    }
                }
            } else if (typeof spec === 'object') {
                for (var key in spec) {
                    sortSpecParts.push({
                        lookup: this._makeLookupFunction(key),
                        ascending: spec[key] >= 0
                    });
                }
            } else {
                throw new Error('Bad sort specification: ', JSON.stringify(spec));
            }
    
            if (sortSpecParts.length === 0) {
                return function () {
                    return 0;
                };
            }
    
            // reduceValue takes in all the possible values for the sort key along various
            // branches, and returns the min or max value (according to the bool
            // findMin). Each value can itself be an array, and we look at its values
            // too. (ie, we do a single level of flattening on branchValues, then find the
            // min/max.)
            var reduceValue = function (branchValues, findMin) {
                var reduced;
                var first = true;
                // Iterate over all the values found in all the branches, and if a value is
                // an array itself, iterate over the values in the array separately.
                _.each(branchValues, function (branchValue) {
                    // Value not an array? Pretend it is.
                    if (!_.isArray(branchValue)) {
                        branchValue = [branchValue];
                    }
                    // Value is an empty array? Pretend it was missing, since that's where it
                    // should be sorted.
                    if (_.isArray(branchValue) && branchValue.length === 0) {
                        branchValue = [undefined];
                    }
                    _.each(branchValue, function (value) {
                        // We should get here at least once: lookup functions return non-empty
                        // arrays, so the outer loop runs at least once, and we prevented
                        // branchValue from being an empty array.
                        if (first) {
                            reduced = value;
                            first = false;
                        } else {
                            // Compare the value we found to the value we found so far, saving it
                            // if it's less (for an ascending sort) or more (for a descending
                            // sort).
                            var cmp = M.DataSelector._cmp(reduced, value);
                            if ((findMin && cmp > 0) || (!findMin && cmp < 0)) {
                                reduced = value;
                            }
                        }
                    });
                });
                return reduced;
            };
    
            return function (a, b) {
                a = a.attributes ? a.attributes : a;
                b = b.attributes ? b.attributes : b;
                for (var i = 0; i < sortSpecParts.length; ++i) {
                    var specPart = sortSpecParts[i];
                    var aValue = reduceValue(specPart.lookup(a), specPart.ascending);
                    var bValue = reduceValue(specPart.lookup(b), specPart.ascending);
                    var compare = M.DataSelector._cmp(aValue, bValue);
                    if (compare !== 0) {
                        return specPart.ascending ? compare : -compare;
                    }
                }
                return 0;
            };
        }
    
    });
    
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Frank
    // Date:      26.04.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    M.SqlSelector = M.DataSelector.design({
    
        _type: 'M.SqlSelector',
    
        _selector: null,
        _query: null,
        _entity: null,
    
        create: function (docSelector, entity) {
            var selector = this.extend({
                _entity: entity,
                _selector: null,
                _query: null
            });
            selector.init(docSelector);
    
            return selector;
        },
    
        init: function (docSelector) {
            this._selector = this.compileSelector(docSelector);
            this._query = this.buildSqlQuery(docSelector);
        },
    
        buildStatement: function (obj) {
            return this._query;
        },
    
        buildSqlQuery: function (selector, connector) {
            // you can pass a literal function instead of a selector
            if (selector instanceof Function) {
                return '';
            }
    
            // shorthand -- sql
            if (_.isString(selector)) {
                return selector;
            }
    
            // protect against dangerous selectors.  falsey and {_id: falsey} are both
            // likely programmer error, and not what you want, particularly for
            // destructive operations.
            if (!selector || (('_id' in selector) && !selector._id)) {
                return '1=2';
            }
    
            // Top level can't be an array or true or binary.
            if (_.isBoolean(selector) || _.isArray(selector) || M.DataField.isBinary(selector)) {
                throw new Error('Invalid selector: ' + selector);
            }
    
            return this.buildSqlWhere(selector)();
        },
    
        // The main compilation function for a given selector.
        buildSqlWhere: function (docSelector) {
            var where = '';
            var that = this;
            var perKeySelectors = [];
            _.each(docSelector, function (subSelector, key) {
                if (key.substr(0, 1) === '$') {
                    // Outer operators are either logical operators (they recurse back into
                    // this function), or $where.
                    perKeySelectors.push(that.buildLogicalOperator(key, subSelector));
                } else {
                    var valueLookup = that.buildLookup(key);
                    var valueSelector = that.buildValueSelector(subSelector);
                    if (_.isFunction(valueSelector)) {
                        perKeySelectors.push(function () {
                            return valueSelector(valueLookup);
                        });
                    }
                }
            });
    
            return function () {
                var sql = '';
                _.each(perKeySelectors, function (f) {
                    if (_.isFunction(f)) {
                        sql += f.call(that);
                    }
                });
                return sql;
            };
        },
    
        buildValueSelector: function (valueSelector) {
            var that = this;
            if (valueSelector === null) {  // undefined or null
                return function (key) {
                    return key + ' IS NULL';
                };
            }
    
            // Selector is a non-null primitive (and not an array or RegExp either).
            if (!_.isObject(valueSelector)) {
                return function (key) {
                    return key + ' = ' + that.buildValue(valueSelector);
                };
            }
    
            if (_.isRegExp(valueSelector)) {
                var regEx = valueSelector.toString();
                var match = regEx.match(/\/[\^]?([^^.*$'+()]*)[\$]?\//);
                if (match && match.length > 1) {
                    var prefix = regEx.indexOf('/^') < 0 ? '%' : '';
                    var suffix = regEx.indexOf('$/') < 0 ? '%' : '';
                    return function (key) {
                        return key + ' LIKE "' + prefix + match[1] + suffix + '"';
                    };
                }
                return null;
            }
    
            // Arrays match either identical arrays or arrays that contain it as a value.
            if (_.isArray(valueSelector)) {
                return null;
            }
    
            // It's an object, but not an array or regexp.
            if (this.hasOperators(valueSelector)) {
                var operatorFunctions = [];
                _.each(valueSelector, function (operand, operator) {
                    if (!_.has(that.VALUE_OPERATORS, operator)) {
                        throw new Error('Unrecognized operator: ' + operator);
                    }
                    operatorFunctions.push(that.VALUE_OPERATORS[operator](operand, that));
                });
                return function (key) {
                    return that.LOGICAL_OPERATORS.$and(operatorFunctions, key);
                };
            }
    
            // It's a literal; compare value (or element of value array) directly to the
            // selector.
            return function (key) {
                return key + ' = ' + that.buildValue(valueSelector);
            };
        },
    
        buildLookup: function (key) {
            var field = this._entity ? this._entity.getField(key) : null;
            key = field && field.name ? field.name : key;
            return '"' + key + '"';
        },
    
        buildValue: function (value) {
            if (_.isString(value)) {
                return '"' + value.replace(/"/g, '""') + '"';
            }
            return value;
        },
    
        buildLogicalOperator: function (operator, subSelector) {
            if (!_.has(this.LOGICAL_OPERATORS, operator)) {
                throw new Error('Unrecognized logical operator: ' + operator);
            } else {
                if (!_.isArray(subSelector) || _.isEmpty(subSelector)) {
                    throw new Error('$and/$or/$nor must be nonempty array');
                }
                var subSelectorFunction = _.map(subSelector, this.buildSqlWhere, this);
                var that = this;
                return function (key) {
                    return that.LOGICAL_OPERATORS[operator](subSelectorFunction, key);
                };
            }
        },
    
        LOGICAL_OPERATORS: {
            '$and': function (subSelectorFunction, key) {
                var sql = '';
                var count = 0;
                _.each(subSelectorFunction, function (f) {
                    var s = f !== null ? f(key) : '';
                    if (s) {
                        count++;
                        sql += sql ? ' AND ' + s : s;
                    }
                });
                return count > 1 ? '( ' + sql + ' )' : sql;
            },
            '$or': function (subSelectorFunction, key) {
                var sql = '';
                var miss = false;
                _.each(subSelectorFunction, function (f) {
                    var s = f !== null ? f(key) : '';
                    miss |= !s;
                    sql += sql && s ? ' OR ' + s : s;
                });
                return miss ? '' : '( ' + sql + ' )';
            },
            '$nor': function (subSelectorFunction, key) {
                var sql = '';
                var miss = false;
                _.each(subSelectorFunction, function (f) {
                    var s = f !== null ? f(key) : '';
                    miss |= !s;
                    sql += sql && s ? ' OR ' + s : s;
                });
                return miss ? '' : 'NOT ( ' + sql + ' )';
            }
        },
    
        VALUE_OPERATORS: {
    
            '$in': function (operand) {
                return null;
            },
    
            '$all': function (operand) {
                return null;
            },
    
            '$lt': function (operand, that) {
                return function (key) {
                    return key + ' < ' + that.buildValue(operand);
                };
            },
    
            '$lte': function (operand, that) {
                return function (key) {
                    return key + ' <= ' + that.buildValue(operand);
                };
            },
    
            '$gt': function (operand, that) {
                return function (key) {
                    return key + ' > ' + that.buildValue(operand);
                };
            },
    
            '$gte': function (operand, that) {
                return function (key) {
                    return key + '' > '' + that.buildValue(operand);
                };
            },
    
            '$ne': function (operand, that) {
                return function (key) {
                    return key + ' <> ' + that.buildValue(operand);
                };
            },
    
            '$nin': function (operand) {
                return null;
            },
    
            '$exists': function (operand, that) {
                return function (key) {
                    return key + ' IS NOT NULL';
                };
            },
    
            '$mod': function (operand) {
                return null;
            },
    
            '$size': function (operand) {
                return null;
            },
    
            '$type': function (operand) {
                return null;
            },
    
            '$regex': function (operand, options) {
                return null;
            },
            '$options': function (operand) {
                return null;
            },
    
            '$elemMatch': function (operand) {
                return null;
            },
    
            '$not': function (operand, that) {
                var matcher = that.buildSqlWhere(operand);
                return function (key) {
                    return 'NOT (' + matcher(key) + ')';
                };
            }
        }
    });
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Frank
    // Date:      02.04.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    M.Store = function() {
        this.initialize.apply(this, arguments);
    };
    
    M.Store.extend = M.extend;
    M.Store.create = M.create;
    M.Store.design = M.design;
    
    // Attach all inheritable methods to the Connector prototype.
    _.extend(M.Store.prototype, Backbone.Events, M.Object, {
    
        _type: 'M.Store',
    
        entities: null,
    
        options: null,
    
        name: '',
    
        typeMapping: (function() {
            var map = {};
            map [M.CONST.TYPE.OBJECTID] = M.CONST.TYPE.STRING;
            map [M.CONST.TYPE.DATE] = M.CONST.TYPE.STRING;
            map [M.CONST.TYPE.BINARY] = M.CONST.TYPE.TEXT;
            return map;
        })(),
    
        initialize: function( options ) {
            options = options || {};
            this.options = this.options || {};
            this.options.name = this.name;
            this.options.typeMapping = this.typeMapping;
            this.options.entities = this.entities;
            _.extend(this.options, options || {});
    
            this._setEntities(options.entities || {});
        },
    
        _setEntities: function( entities ) {
            this.entities = {};
            for( var name in entities ) {
                var entity = M.Entity.from(entities[name], {
                    store: this,
                    typeMapping: this.options.typeMapping
                });
                entity.name = entity.name || name;
    
                // connect collection and model to this store
                var collection = entity.collection || M.Collection.extend({ model: M.Model.extend({}) });
                var model = collection.prototype.model;
                // set new entity and name
                collection.prototype.entity = model.prototype.entity = name;
                collection.prototype.store = model.prototype.store = this;
                entity.idAttribute = entity.idAttribute || model.prototype.idAttribute;
                this.entities[name] = entity;
            }
        },
    
        getEntity: function( obj ) {
            if( obj ) {
                var entity = obj.entity || obj;
                var name = _.isString(entity) ? entity : entity.name;
                if( name ) {
                    return this.entities[name] || (entity && entity.name ? entity : { name: name });
                }
            }
        },
    
        getCollection: function( entity ) {
            if( _.isString(entity) ) {
                entity = this.entities[entity];
            }
            if( entity && entity.collection ) {
                if( M.Collection.prototype.isPrototypeOf(entity.collection) ) {
                    return entity.collection;
                } else {
                    return new entity.collection();
                }
            }
        },
    
        createModel: function( entity, attrs ) {
            if( _.isString(entity) ) {
                entity = this.entities[entity];
            }
            if( entity && entity.collection ) {
                var Model = entity.collection.model || entity.collection.prototype.model;
                if( Model ) {
                    return new Model(attrs);
                }
            }
        },
    
        getArray: function( data ) {
            if( _.isArray(data) ) {
                return data;
            } else if( M.isCollection(data) ) {
                return data.models;
            }
            return _.isObject(data) ? [ data ] : [];
        },
    
        getDataArray: function( data ) {
            var array = [];
            if( _.isArray(data) || Backbone.Collection.prototype.isPrototypeOf(data) ) {
                _.each(data, function( d ) {
                    var attrs = this.getAttributes(d);
                    if( attrs ) {
                        array.push(attrs);
                    }
                });
            } else {
                var attrs = this.getAttributes(data);
                if( attrs ) {
                    array.push(this.getAttributes(attrs));
                }
            }
            return array;
        },
    
        getAttributes: function( model ) {
            if( Backbone.Model.prototype.isPrototypeOf(model) ) {
                return model.attributes;
            }
            return _.isObject(model) ? model : null;
        },
    
        initModel: function( model ) {
        },
    
        initCollection: function( collection ) {
        },
    
        initEntity: function( entity ) {
        },
    
        sync: function( method, model, options ) {
        },
    
        /**
         *
         * @param collection usally a collection, but can also be a model
         * @param options
         */
        fetch: function( collection, options ) {
            if( collection && !collection.models && !collection.attributes && !options ) {
                options = collection;
            }
            if( (!collection || (!collection.models && !collection.attributes)) && options && options.entity ) {
                collection = this.getCollection(options.entity);
            }
            if( collection && collection.fetch ) {
                var opts = _.extend({}, options || {}, { store: this });
                collection.fetch(opts);
            }
        },
    
        create: function( collection, model, options ) {
            if( collection && !collection.models && !options ) {
                model = collection;
                options = model;
            }
            if( (!collection || !collection.models) && options && options.entity ) {
                collection = this.getCollection(options.entity);
            }
            if( collection && collection.create ) {
                var opts = _.extend({}, options || {}, { store: this });
                collection.create(model, opts);
            }
        },
    
        save: function( model, attr, options ) {
            if( model && !model.attributes && !options ) {
                attr = model;
                options = attr;
            }
            if( (!model || !model.attributes) && options && options.entity ) {
                model = this.createModel(options.entity);
            }
            if( model && model.save ) {
                var opts = _.extend({}, options || {}, { store: this });
                model.save(attr, opts);
            }
        },
    
        destroy: function( model, options ) {
            if( model && model.destroy ) {
                var opts = _.extend({}, options || {}, { store: this });
                model.destroy(opts);
            }
        },
    
        _checkEntity: function( obj, entity ) {
            if( !M.isEntity(entity) ) {
                var error = 'No valid entity passed.';
                M.Logger.error(M.CONST.ERROR.VALIDATION_PRESENCE, error);
                this.handleCallback(obj.error, error);
                this.handleCallback(obj.finish, error);
                return false;
            }
            return true;
        },
    
        _checkData: function( obj, data ) {
            if( (!_.isArray(data) || data.length === 0) && !_.isObject(data) ) {
                var error = 'No data passed.';
                M.Logger.error(M.CONST.ERROR.VALIDATION_PRESENCE, error);
                this.handleCallback(obj.error, error);
                this.handleCallback(obj.finish, error);
                return false;
            }
            return true;
        },
    
        handleSuccess: function( obj ) {
            var args = Array.prototype.slice.call(arguments, 1);
            if( obj.success ) {
                this.handleCallback.apply(this, [ obj.success ].concat(args));
            }
            if( obj.finish ) {
                this.handleCallback.apply(this, [ obj.finish ].concat(args));
            }
        },
    
        handleError: function( obj ) {
            var args = Array.prototype.slice.call(arguments, 1);
            if( obj.error ) {
                this.handleCallback.apply(this, [ obj.error ].concat(args));
            }
            if( obj.finish ) {
                this.handleCallback.apply(this, [ obj.finish ].concat(args));
            }
        }
    
    });
    
    M.LocalStorageStore = M.Store.extend({
    
        _type: 'M.LocalStorageStore',
    
        ids: {},
    
        sync: function( method, model, options ) {
            options = options || {};
            var that = options.store || this.store;
            var entity = that.getEntity(model.entity || options.entity || this.entity);
            var attrs;
            if( that && entity && model ) {
                var id = model.id || (method === 'create' ? new M.ObjectID().toHexString() : null);
                attrs = options.attrs || model.toJSON(options);
                switch( method ) {
                    case 'patch':
                    case 'update':
                    case 'create':
                        if (method !== 'create') {
                            attrs = _.extend(that._getItem(entity, id) || {}, attrs);
                        }
                        if( model.id !== id && model.idAttribute ) {
                            attrs[model.idAttribute] = id;
                        }
                        that._setItem(entity, id, attrs);
                        break;
                    case 'delete' :
                        that._removeItem(entity, id);
                        break;
                    case 'read' :
                        if( id ) {
                            attrs = that._getItem(entity, id);
                        } else {
                            attrs = [];
                            var ids = that._getItemIds(entity);
                            for( id in ids ) {
                                var itemData = that._getItem(entity, id);
                                if( itemData ) {
                                    attrs.push(itemData);
                                }
                            }
                        }
                        break;
                    default:
                        return;
                }
            }
            if( attrs ) {
                that.handleSuccess(options, attrs);
            } else {
                that.handleError(options);
            }
        },
    
        _getKey: function( entity, id ) {
            return '_' + entity.name + '_' + id;
        },
    
        _getItem: function( entity, id ) {
            var attrs;
            if( entity && id ) {
                try {
                    attrs = JSON.parse(localStorage.getItem(this._getKey(entity, id)));
                    if( attrs ) {
                        entity.setId(attrs, id); // fix id
                    } else {
                        this._delItemId(id);
                    }
                } catch( e ) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while loading data from local storage: ', e);
                }
            }
            return attrs;
        },
    
        _setItem: function( entity, id, attrs ) {
            if( entity && id && attrs ) {
                try {
                    localStorage.setItem(this._getKey(entity, id), JSON.stringify(attrs));
                    this._addItemId(entity, id);
                } catch( e ) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while saving data to local storage: ', e);
                }
            }
        },
    
        _removeItem: function( entity, id ) {
            if( entity && id ) {
                localStorage.removeItem(this._getKey(entity, id));
                this._delItemId(entity, id);
            }
        },
    
        _addItemId: function( entity, id ) {
            var ids = this._getItemIds(entity);
            if( !(id in ids) ) {
                ids[id] = '';
                this._saveItemIds(entity, ids);
            }
        },
    
        _delItemId: function( entity, id ) {
            var ids = this._getItemIds(entity);
            if( id in ids ) {
                delete ids[id];
                this._saveItemIds(entity, ids);
            }
        },
    
        _getItemIds: function( entity ) {
            try {
                var key = '__ids__' + entity.name;
                if( !this.ids[entity.name] ) {
                    this.ids[entity.name] = JSON.parse(localStorage.getItem(key)) || {};
                }
                return this.ids[entity.name];
            } catch( e ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while loading ids from local storage: ', e);
            }
        },
    
        _saveItemIds: function( entity, ids ) {
            try {
                var key = '__ids__' + entity.name;
                localStorage.setItem(key, JSON.stringify(ids));
            } catch( e ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'Error while saving ids to local storage: ', e);
            }
        }
    });
    M.WebSqlStore = M.Store.extend({
    
        _type: 'M.WebSqlStore',
    
        _selector: null,
    
        options: null,
    
        name: 'themproject',
    
        size: 1024 * 1024, // 1 MB
    
        version: '1.0',
    
        db: null,
    
        dataField: { name: 'data', type: 'text', required: true },
    
        idField: { name: 'id', type: 'string', required: true },
    
        typeMapping: (function() {
            var map = {};
            map [M.CONST.TYPE.OBJECTID] = M.CONST.TYPE.STRING;
            map [M.CONST.TYPE.DATE] = M.CONST.TYPE.STRING;
            map [M.CONST.TYPE.OBJECT] = M.CONST.TYPE.TEXT;
            map [M.CONST.TYPE.ARRAY] = M.CONST.TYPE.TEXT;
            map [M.CONST.TYPE.BINARY] = M.CONST.TYPE.TEXT;
            return map;
        })(),
    
        sqlTypeMapping: (function() {
            var map = {};
            map [M.CONST.TYPE.STRING] = 'varchar(255)';
            map [M.CONST.TYPE.TEXT] = 'text';
            map [M.CONST.TYPE.OBJECT] = 'text';
            map [M.CONST.TYPE.ARRAY] = 'text';
            map [M.CONST.TYPE.FLOAT] = 'float';
            map [M.CONST.TYPE.INTEGER] = 'integer';
            map [M.CONST.TYPE.DATE] = 'varchar(255)';
            map [M.CONST.TYPE.BOOLEAN] = 'boolean';
            return map;
        })(),
    
        initialize: function( options ) {
            M.Store.prototype.initialize.apply(this, arguments);
            this.options = this.options || {};
            this.options.name = this.name;
            this.options.size = this.size;
            this.options.version = this.version;
            this.options.typeMapping = this.typeMapping;
            this.options.sqlTypeMapping = this.sqlTypeMapping;
            _.extend(this.options, options || {});
    
            this._openDb({
                error: function( msg ) {
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, msg);
                }
            });
        },
    
        sync: function( method, model, options ) {
            var that = options.store || this.store;
            var models = M.isCollection(model) ? model.models : [ model ];
            options.entity = options.entity || this.entity;
            switch( method ) {
                case 'create':
                    that._checkTable(options, function() {
                        that._insertOrReplace(models, options);
                    });
                    break;
    
                case 'update':
                case 'patch':
                    that._checkTable(options, function() {
                        that._insertOrReplace(models, options);
                    });
                    break;
    
                case 'delete':
                    that._delete(models, options);
                    break;
    
                case 'read':
                    that._select(this, options);
                    break;
    
                default:
                    break;
            }
        },
    
        select: function( options ) {
            this._select(null, options);
        },
    
        dropTable: function( options ) {
            this._dropTable(options);
        },
    
        createTable: function( options ) {
            this._createTable(options);
        },
    
        execute: function( options ) {
            this._executeSql(options);
        },
    
    
        /**
         * @private
         */
        _openDb: function( options ) {
            var error, dbError;
            /* openDatabase(db_name, version, description, estimated_size, callback) */
            if( !this.db ) {
                try {
                    if( !window.openDatabase ) {
                        error = 'Your browser does not support WebSQL databases.';
                    } else {
                        this.db = window.openDatabase(this.options.name, '', '', this.options.size);
                        if( this.entities ) {
                            for( var key in this.entities ) {
                                this._createTable({ entity: this.entities[key] });
                            }
                        }
                    }
                } catch( e ) {
                    dbError = e;
                }
            }
            if( this.db ) {
                if( this.options.version && this.db.version !== this.options.version ) {
                    this._updateDb(options);
                } else {
                    this.handleSuccess(options, this.db);
                }
            } else if( dbError === 2  || dbError === '2') {
                // Version number mismatch.
                this._updateDb(options);
            } else {
                if( !error && dbError ) {
                    error = dbError;
                }
                this.handleSuccess(options, error);
            }
        },
    
        _updateDb: function( options ) {
            var error;
            var lastSql;
            var that = this;
            try {
                var db = window.openDatabase(this.options.name, '', '', this.options.size);
                try {
                    var arSql = this._sqlUpdateDatabase(db.version, this.options.version);
                    db.changeVersion(db.version, this.options.version, function( tx ) {
                        _.each(arSql, function( sql ) {
                            M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'SQL-Statement: ' + sql);
                            lastSql = sql;
                            tx.executeSql(sql);
                        });
                    }, function( msg ) {
                        that.handleError(options, msg, lastSql);
                    }, function() {
                        that.handleSuccess(options);
                    });
                } catch( e ) {
                    error = e.message;
                    M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'changeversion failed, DB-Version: ' + db.version);
                }
            } catch( e ) {
                error = e.message;
            }
            if( error ) {
                this.handleError(options, error);
            }
        },
    
        _sqlUpdateDatabase: function( oldVersion, newVersion ) {
            // create sql array, simply drop and create the database
            var sql = [];
            if( this.entities ) {
                for( var name in this.entities ) {
                    var entity = this.entities[name];
                    sql.push(this._sqlDropTable(entity.name));
                    sql.push(this._sqlCreateTable(entity));
                }
            }
            return sql;
        },
    
        _sqlDropTable: function( name ) {
            return 'DROP TABLE IF EXISTS \'' + name + '\'';
        },
    
        _isAutoincrementKey: function( entity, key ) {
            if( entity && key ) {
                var column = this.getField(entity, key);
                return column && column.type === M.CONST.TYPE.INTEGER;
            }
        },
    
        _sqlPrimaryKey: function( entity, keys ) {
            if( keys && keys.length === 1 ) {
                if( this._isAutoincrementKey(entity, keys[0]) ) {
                    return keys[0] + ' INTEGER PRIMARY KEY ASC AUTOINCREMENT UNIQUE';
                } else {
                    return keys[0] + ' PRIMARY KEY ASC UNIQUE';
                }
            }
            return '';
        },
    
        _sqlConstraint: function( entity, keys ) {
            if( keys && keys.length > 1 ) {
                return 'PRIMARY KEY (' + keys.join(',') + ') ON CONFLICT REPLACE';
            }
            return '';
        },
    
        _sqlCreateTable: function( entity ) {
            var that = this;
            var keys = entity.getKeys();
            var primaryKey = keys.length === 1 ? this._sqlPrimaryKey(entity, keys) : '';
            var constraint = keys.length > 1 ? this._sqlConstraint(entity, keys) : (entity.constraint || '');
    
            var columns = '';
            var fields = this.getFields(entity);
            _.each(fields, function( field ) {
                // skip ID, it is defined manually above
                if( !primaryKey || field.name !== keys[0] ) {
                    // only add valid types
                    var attr = that._dbAttribute(field);
                    if( attr ) {
                        columns += (columns ? ', ' : '') + attr;
                    }
                }
            });
            if( !columns ) {
                columns = this._dbAttribute(this.dataField);
            }
            var sql = 'CREATE TABLE IF NOT EXISTS \'' + entity.name + '\' (';
            sql += primaryKey ? primaryKey + ', ' : '';
            sql += columns;
            sql += constraint ? ', ' + constraint : '';
            sql += ');';
            return sql;
        },
    
        _sqlDelete: function( models, options, entity ) {
            var sql = 'DELETE FROM \'' + entity.name + '\'';
            var where = this._sqlWhere(options, entity) || this._sqlWhereFromData(models, entity);
            if( where ) {
                sql += ' WHERE ' + where;
            }
            sql += options.and ? ' AND ' + options.and : '';
            return sql;
        },
    
        _sqlWhere: function( options, entity ) {
            this._selector = null;
            var sql = '';
            if( _.isString(options.where) ) {
                sql = options.where;
            } else if( _.isObject(options.where) ) {
                this._selector = M.SqlSelector.create(options.where, entity);
                sql = this._selector.buildStatement();
            }
            return sql;
        },
    
        _sqlWhereFromData: function( models, entity ) {
            var that = this;
            var ids = [];
            if( models && entity && entity.idAttribute ) {
                var id, key = entity.idAttribute;
                var field = this.getField(entity, key);
                _.each(models, function( model ) {
                    id = model.id;
                    if( !_.isUndefined(id) ) {
                        ids.push(that._sqlValue(id, field));
                    }
                });
                if( ids.length > 0 ) {
                    return key + ' IN (' + ids.join(',') + ')';
                }
            }
            return '';
        },
    
        _sqlSelect: function( options, entity ) {
    
            var sql = 'SELECT ';
            if( options.fields ) {
                if( options.fields.length > 1 ) {
                    sql += options.fields.join(', ');
                } else if( options.fields.length === 1 ) {
                    sql += options.fields[0];
                }
            } else {
                sql += '*';
            }
            sql += ' FROM \'' + entity.name + '\'';
            if( options.join ) {
                sql += ' JOIN ' + options.join;
            }
    
            if( options.leftJoin ) {
                sql += ' LEFT JOIN ' + options.leftJoin;
            }
    
            var where = this._sqlWhere(options, entity) || this._sqlWhereFromData(options, entity);
            if( where ) {
                sql += ' WHERE ' + where;
            }
    
            if( options.order ) {
                sql += ' ORDER BY ' + options.order;
            }
    
            if( options.limit ) {
                sql += ' LIMIT ' + options.limit;
            }
    
            if( options.offset ) {
                sql += ' OFFSET ' + options.offset;
            }
    
            return sql;
        },
    
        _sqlValue: function( value, field ) {
            var type = field && field.type ? field.type : M.Field.prototype.detectType(value);
            if( type === M.CONST.TYPE.INTEGER || type === M.CONST.TYPE.FLOAT ) {
                return value;
            } else if( type === M.CONST.TYPE.BOOLEAN ) {
                return value ? '1' : '0';
            } else if( type === M.CONST.TYPE.NULL ) {
                return 'NULL';
            }
            value = M.Field.prototype.transform(value, M.CONST.TYPE.STRING);
            value = value.replace(/"/g, '""');
            return '"' + value + '"';
        },
    
        _dbAttribute: function( field ) {
            if( field && field.name ) {
                var type = this.options.sqlTypeMapping[field.type];
                var isReqStr = field.required ? ' NOT NULL' : '';
                if( type ) {
                    return field.name + ' ' + type.toUpperCase() + isReqStr;
                }
            }
        },
    
        _dropTable: function( options ) {
    
            var entity = this.getEntity(options);
            entity.db = null;
    
            if( this._checkDb(options) && entity ) {
                var sql = this._sqlDropTable(entity.name);
                // reset flag
                this._executeTransaction(options, [sql]);
            }
        },
    
        _createTable: function( options ) {
    
            var entity = this.getEntity(options);
            entity.db = this.db;
    
            if( this._checkDb(options) && this._checkEntity(options, entity) ) {
                var sql = this._sqlCreateTable(entity);
                // reset flag
                this._executeTransaction(options, [sql]);
            }
        },
    
        _checkTable: function( options, callback ) {
            var entity = this.getEntity(options);
            var that = this;
            if( entity && !entity.db ) {
                this._createTable({
                    success: function() {
                        callback();
                    },
                    error: function( error ) {
                        this.handleError(options, error);
                    },
                    entity: entity
                });
            } else {
                callback();
            }
        },
    
        _insertOrReplace: function( models, options ) {
    
            var entity = this.getEntity(options);
    
            if( this._checkDb(options) && this._checkEntity(options, entity) && this._checkData(options, models) ) {
    
                var isAutoInc = this._isAutoincrementKey(entity, entity.getKey());
                var statements = [];
                var sqlTemplate = 'INSERT OR REPLACE INTO \'' + entity.name + '\' (';
                for( var i = 0; i < models.length; i++ ) {
                    var model = models[i];
                    var statement = ''; // the actual sql insert string with values
                    if( !isAutoInc && !model.id && model.idAttribute ) {
                        model.set(model.idAttribute, new M.ObjectID().toHexString());
                    }
                    var value = options.attrs || model.toJSON();
                    var args, keys;
                    if( !_.isEmpty(entity.fields) ) {
                        args = _.values(value);
                        keys = _.keys(value);
                    } else {
                        args = [ model.id, JSON.stringify(value) ];
                        keys = [ 'id', 'data'];
                    }
                    if( args.length > 0 ) {
                        var values = new Array(args.length).join('?,') + '?';
                        var columns = '\'' + keys.join('\',\'') + '\'';
                        statement += sqlTemplate + columns + ') VALUES (' + values + ');';
                        statements.push({ statement: statement, arguments: args });
                    }
                }
                this._executeTransaction(options, statements);
            }
        },
    
        _select: function( result, options ) {
    
            var entity = this.getEntity(options);
    
            if( this._checkDb(options) && this._checkEntity(options, entity) ) {
                var lastStatement;
                var isCollection = M.isCollection(result);
                if( isCollection ) {
                    result = [];
                }
                var stm = this._sqlSelect(options, entity);
                var that = this;
                this.db.readTransaction(function( t ) {
                    var statement = stm.statement || stm;
                    var args = stm.arguments;
                    lastStatement = statement;
                    M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'SQL-Statement: ' + statement);
                    if( args ) {
                        M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, '    Arguments: ' + JSON.stringify(args));
                    }
                    t.executeSql(statement, args, function( tx, res ) {
                        var len = res.rows.length;//, i;
                        for( var i = 0; i < len; i++ ) {
                            var item = res.rows.item(i);
                            var attrs;
                            if( !_.isEmpty(entity.fields) || !that._hasDefaultFields(item) ) {
                                attrs = item;
                            } else {
                                try {
                                    attrs = JSON.parse(item.data);
                                } catch( e ) {
                                }
                            }
                            if( attrs && (!that._selector || that._selector.matches(attrs)) ) {
                                if( isCollection ) {
                                    result.push(attrs);
                                } else {
                                    result = attrs;
                                    break;
                                }
                            }
                        }
                    }, function() {
                        // M.Logger.log('Incorrect statement: ' + sql, M.ERR)
                    }); // callbacks: SQLStatementErrorCallback
                }, function( sqlError ) { // errorCallback
                    M.Logger.error(M.CONST.ERROR.WEBSQL_SYNTAX, 'WebSql Syntax Error: ' + sqlError.message);
                    that.handleError(options, sqlError.message, lastStatement);
                }, function() { // voidCallback (success)
                    that.handleSuccess(options, result);
                });
            }
        },
    
        _delete: function( models, options ) {
            var entity = this.getEntity(options);
            if( this._checkDb(options) && this._checkEntity(options, entity) ) {
                var sql = this._sqlDelete(models, options, entity);
                // reset flag
                this._executeTransaction(options, [sql]);
            }
        },
    
        _executeSql: function( options ) {
            if( options.sql ) {
                this._executeTransaction(options, [options.sql]);
            }
        },
    
        _executeTransaction: function( options, statements ) {
            var error;
            var lastStatement;
            if( this._checkDb(options) ) {
                var that = this;
                try {
                    /* transaction has 3 parameters: the transaction callback, the error callback and the success callback */
                    this.db.transaction(function( t ) {
                        _.each(statements, function( stm ) {
                            var statement = stm.statement || stm;
                            var args = stm.arguments;
                            lastStatement = statement;
                            M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, 'SQL-Statement: ' + statement);
                            if( args ) {
                                M.Logger.log(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, '    Arguments: ' + JSON.stringify(args));
                            }
                            t.executeSql(statement, args);
                        });
                    }, function( sqlError ) { // errorCallback
                        M.Logger.error(M.CONST.ERROR.WEBSQL_SYNTAX, sqlError.message);
                        that.handleError(options, sqlError.message, lastStatement);
                    }, function() {
                        that.handleSuccess(options);
                    });
                } catch( e ) {
                    M.Logger.error(M.CONST.ERROR.WEBSQL_UNKNOWN, e.message);
                }
            }
            if( error ) {
                this.handleCallback(options.error, error, lastStatement);
            }
        },
    
        _hasDefaultFields: function( item ) {
            return _.every(_.keys(item), function( key ) {
                return key === this.idField.name || key === this.dataField.name;
            }, this);
        },
    
        _checkDb: function( options ) {
            // has to be initialized first
            if( !this.db ) {
                var error = 'db handler not initialized.';
                M.Logger.error(M.CONST.ERROR.WEBSQL_NO_DBHANDLER, error);
                this.handleError(options, error);
                return false;
            }
            return true;
        },
    
        getFields: function( entity ) {
            if( !_.isEmpty(entity.fields) ) {
                return entity.fields;
            } else {
                var fields = {};
                fields.data = this.dataField;
                var idAttribute = entity.idAttribute || 'id';
                fields[idAttribute] = this.idField;
                return fields;
            }
        },
    
        getField: function( entity, key ) {
            return this.getFields(entity)[key];
        }
    });
    M.BikiniStore = M.Store.extend({
    
        _type: 'M.BikiniStore',
    
        _transactionFailed: false,
    
        _selector: null,
    
        endpoints: {},
    
        options: null,
    
        localStore: M.WebSqlStore,
    
        useLocalStore: true,
    
        useSocketNotify: true,
    
        useOfflineChanges: true,
    
        typeMapping: {
            'binary': 'text',
            'date': 'string'
        },
    
        initialize: function( options ) {
            M.Store.prototype.initialize.apply(this, arguments);
            this.options = this.options || {};
            this.options.useLocalStore = this.useLocalStore;
            this.options.useSocketNotify = this.useSocketNotify;
            this.options.useOfflineChanges = this.useOfflineChanges;
            this.options.socketPath = this.socketPath;
            this.options.localStore = this.localStore;
            this.options.typeMapping = this.typeMapping;
            _.extend(this.options, options || {});
        },
    
        initModel: function( model ) {
        },
    
        initCollection: function( collection ) {
            var url = collection.getUrlRoot();
            var entity = this.getEntity(collection.entity);
            if( url && entity ) {
                var name = entity.name;
                var idAttribute = entity.idAttribute;
                var hash = this._hashCode(url);
                var credentials = entity.credentials || collection.credentials;
                var user = credentials && credentials.username ? credentials.username : '';
                var channel = name + user + hash;
                collection.channel = channel;
                // get or create endpoint for this url
                var that = this;
                var endpoint = this.endpoints[hash];
                if( !endpoint ) {
                    var href = M.Request.getLocation(url);
                    endpoint = {};
                    endpoint.baseUrl = url;
                    endpoint.readUrl = collection.getUrl();
                    endpoint.host = href.protocol + '//' + href.host;
                    endpoint.path = href.pathname;
                    endpoint.entity = entity;
                    endpoint.channel = channel;
                    endpoint.credentials = credentials;
                    endpoint.socketPath = this.options.socketPath;
                    endpoint.localStore = this.createLocalStore(endpoint);
                    endpoint.messages = this.createMsgCollection(endpoint);
                    endpoint.socket = this.createSocket(endpoint, collection);
                    endpoint.info = this.fetchServerInfo(endpoint, collection);
                    that.endpoints[hash] = endpoint;
                }
                collection.endpoint = endpoint;
                collection.listenTo(this, endpoint.channel, this.onMessage, collection);
                if( endpoint.messages && !endpoint.socket ) {
                    that.sendMessages(endpoint, collection);
                }
            }
        },
    
        getEndpoint: function( url ) {
            if( url ) {
                var hash = this._hashCode(url);
                return this.endpoints[hash];
            }
        },
    
        createLocalStore: function( endpoint, idAttribute ) {
            if( this.options.useLocalStore && endpoint ) {
                var entities = {};
                entities[endpoint.entity.name] = {
                    name: endpoint.channel,
                    idAttribute: idAttribute
                };
                return new this.options.localStore({
                    entities: entities
                });
            }
        },
    
        createMsgCollection: function( endpoint ) {
            if( this.options.useOfflineChange && endpoint ) {
                var name = 'msg-' + endpoint.channel;
                var MsgCollection = M.Collection.extend({
                    model: M.Model.extend({ idAttribute: '_id' })
                });
                var messages = new MsgCollection({
                    entity: name,
                    store: new this.options.localStore()
                });
                messages.fetch();
                return messages;
            }
        },
    
        createSocket: function( endpoint, collection ) {
            if( this.options.useSocketNotify && endpoint.socketPath && endpoint ) {
                var path = endpoint.path;
                path = endpoint.socketPath || (path + (path.charAt(path.length - 1) === '/' ? '' : '/' ) + 'live');
                // remove leading /
                var resource = (path && path.indexOf('/') === 0) ? path.substr(1) : path;
                var that = this;
                var socket = M.SocketIO.create({
                    host: endpoint.host,
                    resource: resource,
                    connected: function() {
                        that._bindChannel(socket, endpoint);
                        that.sendMessages(endpoint, collection);
                    }
                });
                return socket;
            }
        },
    
        _bindChannel: function( socket, endpoint ) {
            var that = this;
            var channel = endpoint.channel;
            var name = endpoint.entity.name;
            var time = this.getLastMessageTime(channel);
            socket.on(channel, function( msg ) {
                if( msg ) {
                    that.setLastMessageTime(channel, msg.time);
                    that.trigger(channel, msg);
                }
            });
            socket.emit('bind', {
                entity: name,
                channel: channel,
                time: time
            });
        },
    
        getLastMessageTime: function( channel ) {
            return localStorage.getItem('__' + channel + 'last_msg_time') || 0;
        },
    
        setLastMessageTime: function( channel, time ) {
            if( time ) {
                localStorage.setItem('__' + channel + 'last_msg_time', time);
            }
        },
    
        _hashCode: function( str ) {
            var hash = 0, char;
            if( str.length === 0 ) {
                return hash;
            }
            for( var i = 0, l = str.length; i < l; i++ ) {
                char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        },
    
        onMessage: function( msg ) {
            if( msg && msg.method ) {
                var localStore = this.endpoint ? this.endpoint.localStore : null;
                var options = { store: localStore, merge: true, fromMessage: true, entity: this.entity, parse: true };
                var attrs = msg.data;
    
                switch( msg.method ) {
                    case 'patch':
                    case 'update':
                    case 'create':
                        options.patch = msg.method === 'patch';
                        var model = msg.id ? this.get(msg.id) : null;
                        if( model ) {
                            model.save(attrs, options);
                        } else {
                            this.create(attrs, options);
                        }
                        break;
                    case 'delete':
                        if( msg.id ) {
                            if( msg.id === 'all' ) {
                                while((model = this.first())) {
                                    if( localStore ) {
                                        localStore.sync.apply(this, ['delete', model, { store: localStore, fromMessage: true } ]);
                                    }
                                    this.remove(model);
                                }
                                this.store.setLastMessageTime(this.endpoint.channel, '');
                            } else {
                                var msgModel = this.get(msg.id);
                                if( msgModel ) {
                                    msgModel.destroy(options);
                                }
                            }
                        }
                        break;
    
                    default:
                        break;
                }
            }
        },
    
        sync: function( method, model, options ) {
            var that = options.store || this.store;
            if( options.fromMessage ) {
                return that.handleCallback(options.success);
            }
            var endpoint = that.getEndpoint(this.getUrlRoot());
            if( that && endpoint ) {
                var channel = this.channel;
    
                if( M.isModel(model) && !model.id ) {
                    model.set(model.idAttribute, new M.ObjectID().toHexString());
                }
    
                var time = that.getLastMessageTime(channel);
                // only send read messages if no other store can do this
                // or for initial load
                if( method !== 'read' || !endpoint.localStore || !time ) {
                    // do backbone rest
                    that.addMessage(method, model, // we don't need to call callbacks if an other store handle this
                        endpoint.localStore ? {} : options, endpoint);
                } else if( method === 'read' && time ) {
                    that.fetchChanges(endpoint, time);
                }
                if( endpoint.localStore ) {
                    options.store = endpoint.localStore;
                    endpoint.localStore.sync.apply(this, arguments);
                }
            }
        },
    
        addMessage: function( method, model, options, endpoint ) {
            var that = this;
            if( method && model ) {
                var changes = model.changedSinceSync;
                var data = null;
                var storeMsg = false;
                switch( method ) {
                    case 'update':
                    case 'create':
                        data = options.attrs || model.toJSON();
                        storeMsg = true;
                        break;
                    case 'patch':
                        if( _.isEmpty(changes) ) {
                            return;
                        }
                        data = model.toJSON({ attrs: changes });
                        storeMsg = true;
                        break;
                    case 'delete':
                        storeMsg = true;
                        break;
                }
                var msg = {
                    _id: model.id,
                    id: model.id,
                    method: method,
                    data: data
                };
                var emit = function( endpoint, msg ) {
                    that.emitMessage(endpoint, msg, options, model);
                };
                if( storeMsg ) {
                    this.storeMessage(endpoint, msg, emit);
                } else {
                    emit(endpoint, msg);
                }
            }
        },
    
        emitMessage: function( endpoint, msg, options, model ) {
            var channel = endpoint.channel;
            var that = this;
            var url = M.isModel(model) || msg.method !== 'read' ? endpoint.baseUrl : endpoint.readUrl;
            if( msg.id && msg.method !== 'create' ) {
                url += '/' + msg.id;
            }
            model.sync.apply(model, [msg.method, model, {
                url: url,
                error: function( xhr, status ) {
                    if( !xhr.responseText && that.options.useOfflineChange ) {
                        // this seams to be only a connection problem, so we keep the message an call success
                        that.handleCallback(options.success, msg.data);
                    } else {
                        that.removeMessage(endpoint, msg, function( endpoint, msg ) {
                            // Todo: revert changed data
                            that.handleCallback(options.error, status);
                        });
                    }
                },
                success: function( data ) {
                    that.removeMessage(endpoint, msg, function( endpoint, msg ) {
                        if( options.success ) {
                            var resp = data;
                            that.handleCallback(options.success, resp);
                        } else {
                            // that.setLastMessageTime(channel, msg.time);
                            if( msg.method === 'read' ) {
                                var array = _.isArray(data) ? data : [ data ];
                                for( var i = 0; i < array.length; i++ ) {
                                    data = array[i];
                                    if( data ) {
                                        that.trigger(channel, {
                                            id: data._id,
                                            method: 'update',
                                            data: data
                                        });
                                    }
                                }
                            } else {
                                that.trigger(channel, msg);
                            }
                        }
                    });
                },
                store: {}
            }]);
        },
    
        fetchChanges: function( endpoint, time ) {
            var that = this;
            if( endpoint && endpoint.baseUrl && time ) {
                var changes = new M.Collection({});
                changes.fetch({
                    url: endpoint.baseUrl + '/changes/' + time,
                    success: function() {
                        changes.each(function( msg ) {
                            if( msg.time && msg.method ) {
                                that.setLastMessageTime(endpoint.channel, msg.time);
                                that.trigger(endpoint.channel, msg);
                            }
                        });
                    },
                    credentials: endpoint.credentials
                });
            }
        },
    
        fetchServerInfo: function( endpoint, collection ) {
            var that = this;
            if( endpoint && endpoint.baseUrl ) {
                var info = new M.Model();
                var time = that.getLastMessageTime(endpoint.channel);
                info.fetch({
                    url: endpoint.baseUrl + '/info',
                    success: function() {
                        if( !time && info.get('time') ) {
                            that.setLastMessageTime(endpoint.channel, info.get('time'));
                        }
                        if( !endpoint.socketPath && info.get('socketPath') ) {
                            endpoint.socketPath = info.get('socketPath');
                            endpoint.entity.name = info.get('entity') || endpoint.entity.name;
                            if( that.options.useSocketNotify ) {
                                that.createSocket(endpoint, collection);
                            }
                        }
                    },
                    credentials: endpoint.credentials
                });
            }
        },
    
        sendMessages: function( endpoint, collection ) {
            if( endpoint && endpoint.messages && collection ) {
                var that = this;
                endpoint.messages.each(function( message ) {
                    var msg;
                    try {
                        msg = JSON.parse(message.get('msg'));
                    } catch( e ) {
                    }
                    var channel = message.get('channel');
                    if( msg && channel ) {
                        var model = that.createModel({ collection: collection }, msg.data);
                        that.emitMessage(endpoint, msg, {}, model);
                    } else {
                        message.destroy();
                    }
                });
            }
        },
    
        mergeMessages: function( data, id ) {
            return data;
        },
    
        storeMessage: function( endpoint, msg, callback ) {
            if( endpoint && endpoint.messages && msg ) {
                var channel = endpoint.channel;
                var message = endpoint.messages.get(msg._id);
                if( message ) {
                    var oldMsg = JSON.parse(message.get('msg'));
                    message.save({
                        msg: JSON.stringify(_.extend(oldMsg, msg))
                    });
                } else {
                    endpoint.messages.create({
                        _id: msg._id,
                        id: msg.id,
                        msg: JSON.stringify(msg),
                        channel: channel
                    });
                }
            }
            callback(endpoint, msg);
        },
    
        removeMessage: function( endpoint, msg, callback ) {
            if( endpoint && endpoint.messages ) {
                var message = endpoint.messages.get(msg._id);
                if( message ) {
                    message.destroy();
                }
            }
            callback(endpoint, msg);
        },
    
        clear: function( collection ) {
            if( collection ) {
                var endpoint = this.getEndpoint(collection.getUrlRoot());
                if( endpoint ) {
                    if( endpoint.localStore ) {
                        endpoint.localStore.destroy();
                    }
                    if( endpoint.messages ) {
                        endpoint.messages.destroy();
                    }
                    collection.reset();
                    this.setLastMessageTime(endpoint.channel, '');
                }
            }
        }
    
    });
    
    
    
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Dominik
    // Date:      26.04.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * @class
     * @extends M.Object
     */
    M.Interface = M.Object.design(/** @scope M.Interface.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Interface',
    
        /**
         * This property is used to identify M.Interface and all of its derived object as
         * valid interfaces.
         *
         * @type Boolean
         */
        isMInterface: YES,
    
        /**
         * This method returns the object to implement the interface of
         * some component within the framework. This basic implementation
         * of M.Interface has to be overwritten in any concrete sub-object
         * of M.Interface.
         *
         * @returns {Object}
         */
        getInterface: function() {
            return void null;
        }
    
    });
    
    
    
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Dominik
    // Date:      15.05.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * @class
     * @extends M.Interface
     */
    M.ViewEnableState = M.Interface.design(/** @scope M.ContentBinding.prototype */{
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.ViewActiveState',
    
        _isEnabled: YES,
    
        disable: function(){
            this._isEnabled = NO;
            this.$el.addClass('disabled').removeClass('enabled');
            this._disableEvents();
            return this;
        },
    
        enable: function(){
            this._isEnabled = YES;
            this.$el.addClass('enabled').removeClass('disabled');
            this._enableEvents();
            return this;
        },
    
        getInterface: function() {
            return {
                disable: this.disable,
                enable: this.enable
            };
        }
    
    });
    
    
    
    M.TemplateManager = M.Object.design({
    
        'M.View': {
            defaultTemplate: '<div><%= _value_ %></div>'
        },
    
        'M.ButtonView': {
            defaultTemplate: '<div class="button"><% if(icon) { %> <i class="fa <%= icon %>"></i> <% } %> <div data-binding="_value_"<% if(_value_) {  } %>><%= _value_ %></div></div>',
            topcoat: '<button class="topcoat-button--large" data-binding="_value_"><%= _value_ %></button>',
            bootstrap: '<button type="button" class="btn btn-lg"><%= _value_ %></button>',
            jqm: '<a data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text" data-binding="_value_"><%= _value_ %></span></span></a>'
        },
    
        'M.ToolbarView': {
            defaultTemplate: '<div><div data-childviews="first"></div> <div class="center" data-binding="_value_"><%= _value_ %></div> <div data-childviews="second"></div></div>',
            bootstrap: '<div class="page-header"><div data-childviews="first"></div><h1><%= _value_ %></h1><div data-childviews="second"></div></div>',
            topcoat: '<div><div data-childviews="first"></div><h2><%= _value_ %></h2><div data-childviews="second"></div></div>',
            jqm: '<div data-role="header" class="ui-header ui-bar-a" role="banner"><div data-childviews="first" class="ui-btn-left"></div><h1 class="ui-title" role="heading" aria-level="1"><%= _value_ %></h1><div data-childviews="second" class="ui-btn-right"></div></div>'
        },
    
    
        //TODO implement label for=""
        'M.TextfieldView': {
            defaultTemplate: '<div><% if(label) {  %><label><%= label %><% } %><input type="<%= type %>" value="<%= _value_ %>"><% if(label) {  %></label><% } %></div>',
            bootstrap: '<div><% if(label) {  %><label><%= label %></label><% } %><input type="text" class="form-control" value="<%= _value_ %>"></div>',
            topcoat: '<input value="<%= _value_ %>"/>',
            jqm: '<% if(label) {  %><label for="text-1" class="ui-input-text"><%= label %></label><% } %><div class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c"><input type="text" name="text-1" id="text-1" value="" class="ui-input-text ui-body-c"></div>'
        },
    
        'M.TextareaView': {
            defaultTemplate: '<div><% if(label) {  %><label><%= label %><% } %><textarea><%= _value_ %></textarea><% if(label) {  %></label><% } %></div>'
        },
    
        'M.ButtonGroupView': {
            defaultTemplate: '<div class="clearfix" data-childviews="buttons"></div>'
        },
    
        'M.SearchfieldView': {
            defaultTemplate: '<div contenteditable="true"><%= _value_ %></div>',
            bootstrap: '<div><% if(label) {  %><label><%= label %></label><% } %><input type="text" class="form-control" placeholder="<%= placeholder %>"></div>',
            topcoat: '<div contenteditable="true"><%= _value_ %></div>',
            jqm: '<% if(label) {  %><label for="text-1" class="ui-input-text"><%= label %></label><% } %><div class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c"><input type="text" data-type="search" name="search-1" id="search-1" value="" class="ui-input-text ui-body-c"><a href="#" class="ui-input-clear ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-fullsize ui-btn-icon-notext ui-input-clear-hidden" title="clear text" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="delete" data-iconpos="notext" data-theme="c" data-mini="false"><span class="ui-btn-inner"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a></div>'
        },
    
        'M.ListView': {
            defaultTemplate: '<ul data-childviews="list"></ul>',
            bootstrap: '<ul class="list-group" data-childviews="list"></ul>',
            topcoat: '<div data-childviews="list"></div>',
            jqm: '<div data-childviews="list"></div>'
        },
    
        'M.ListItemView': {
            defaultTemplate: '<li><%= _value_ %></li>',
            bootstrap: '<li class="list-group-item"><%= _value_ %></li>',
            topcoat: '<div data-childviews="list"><%= _value_ %></div>',
            jqm: '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a class="ui-link-inherit"><%= _value_ %></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>'
        },
    
        'M.ModelView': {
            defaultTemplate: '<ul><%= _value_ %></ul>',
            bootstrap: '<div><%= _value_ %></div>',
            topcoat: '<div><%= _value_ %></div>',
            jqm: '<div><%= _value_ %></div>'
        },
    
        'M.LabelView': {
            defaultTemplate: '<div contenteditable="true"><%= _value_ %></div>',
            bootstrap: '<div contenteditable="true"><%= _value_ %></div>',
            topcoat: '<div contenteditable="true"><%= _value_ %></div>',
            jqm: '<div contenteditable="true"><%= _value_ %></div>'
        },
    
        'M.DebugView': {
            defaultTemplate: '<div><div data-childviews="debug-menu"></div><div data-childviews="debug-grid"></div></div>'
        },
    
        'M.AccordionView': {
            defaultTemplate: '<ul><%= _value_ %></ul>',
            bootstrap: '<div><%= _value_ %></div>',
            topcoat: '<div><%= _value_ %></div>',
            jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
        },
    
        'M.AccordionItemView': {
            defaultTemplate: '<ul><%= _value_ %></ul>',
            bootstrap: '<div><%= _value_ %></div>',
            topcoat: '<div><%= _value_ %></div>',
            jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
        },
    
        'M.SliderView': {
            defaultTemplate: '<input type="range">',
            bootstrap: '<input type="range">',
            topcoat: '<input type="range">',
            jqm: '<div class="ui-slider"><input type="number" data-type="range" name="slider-1" id="slider-1" min="0" max="100" value="50" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-slider-input"><div role="application" class="ui-slider-track ui-btn-down-c ui-btn-corner-all"><a href="#" class="ui-slider-handle ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="74" aria-valuetext="74" title="74" aria-labelledby="slider-1-label" style="left: 74%;"><span class="ui-btn-inner"><span class="ui-btn-text"></span></span></a></div></div>'
        },
    
        'M.ToggleView': {
            defaultTemplate: '<div><div data-childviews="first"></div><div data-childviews="second"></div></div>',
            bootstrap: '<div><div data-childviews="first">first</div><div data-childviews="second">second</div></div>',
            topcoat: '<div><div data-childviews="first"></div><div data-childviews="second"></div></div>',
            jqm: '<div><div data-childviews="first"></div><div data-childviews="second"></div></div>'
        },
    
        'M.ImageView': {
            defaultTemplate: '<img src="<%= _value_ %>" alt="<%= alt %>" />',
            bootstrap: '<img src="<%= _value_ %>" alt="<%= alt %>" />',
            topcoat: '<img src="<%= _value_ %>" alt="<%= alt %>" />',
            jqm: '<img src="<%= _value_ %>" alt="<%= alt %>" />'
        },
    
        'M.LoaderView': {
            defaultTemplate: '<div class="ui-loader ui-corner-all ui-body-d ui-loader-default"><span class="ui-icon ui-icon-loading"></span><h1>loading</h1></div>',
            bootstrap: '<div class="ui-loader ui-corner-all ui-body-d ui-loader-default"><span class="ui-icon ui-icon-loading"></span><h1>loading</h1></div>',
            topcoat: '<div class="ui-loader ui-corner-all ui-body-d ui-loader-default"><span class="ui-icon ui-icon-loading"></span><h1>loading</h1></div>',
            jqm: '<div class="ui-loader ui-corner-all ui-body-d ui-loader-default"><span class="ui-icon ui-icon-loading"></span><h1>loading</h1></div>'
        },
    
        'M.DialogView': {
            defaultTemplate: '<div></div>',
            bootstrap: '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h4 class="modal-title" id="myModalLabel"><%= header %></h4> </div> <div class="modal-body"><%= message %></div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal"><%= cancel %></button> <button type="button" class="btn btn-primary"><%= ok %></button> </div> </div><!-- /.modal-content --> </div>',
            topcoat: '<input type="range">',
            jqm: '<div role="dialog" class="ui-dialog-contain ui-overlay-shadow ui-corner-all">' + '<div data-role="header" data-theme="d" class="ui-header ui-bar-d" role="banner"><a href="#" class="ui-btn-left ui-btn ui-btn-up-d ui-shadow ui-btn-corner-all ui-btn-icon-notext" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="d" title="Close"><span class="ui-btn-inner"><span class="ui-btn-text"><%= close %></span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>' + '<h1 class="ui-title" role="heading" aria-level="1"><%= header %></h1>' + '</div>' + '<div data-role="content" class="ui-content ui-body-c" role="main">' + '<p><%= message %></p>' + '<a href="dialog/index.html" data-role="button" data-rel="back" data-theme="b" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-b"><span class="ui-btn-inner"><span class="ui-btn-text"><%= ok %></span></span></a>' + '<a href="dialog/index.html" data-role="button" data-rel="back" data-theme="c" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"><%= cancel %></span></span></a>' + '</div>' + '</div>'
        },
    
        'M.SelectionListView': {
            defaultTemplate: '<div class="selection-list<% if(isMultiple){ %> multiple<% } %>"><select<% if(isMultiple){ %> multiple<% } %>><%= _value_ %></select></div>'
        },
    
        _currentUI: 'defaultTemplate',
    
        get: function( template, ui ) {
    
            ui = ui || M.TemplateManager._currentUI;
    
            if( !this[template] ) {
                template = 'M.View';
            }
    
            if( this[template] ) {
                //use TMP.TemplateManager._currentUI because this function is called in another this context
                var tpl = this[template][ui];
                if( !tpl ) {
                    return this[template].defaultTemplate;
                } else {
                    return tpl;
                }
            }
        }
    });
    
    
    
    //Thanks to: https://github.com/codrops/PageTransitions
    
    (function( scope ) {
    
        M.PageTransitions = M.Object.design({
    
            NONE : 'none',
            MOVE_TO_LEFT_FROM_RIGHT : 'm-page-moveToLeft|m-page-moveFromRight',
            MOVE_TO_RIGHT_FROM_LEFT : 'm-page-moveToRight|m-page-moveFromLeft',
            MOVE_TO_TOP_FROM_BOTTOM : 'm-page-moveToTop|m-page-moveFromBottom',
            MOVE_TO_BOTTOM_FROM_TOP : 'm-page-moveToBottom|m-page-moveFromTop',
            FADE_FROM_RIGHT: 'm-page-fade|m-page-moveFromRight m-page-ontop',
            FADE_FROM_LEFT: 'm-page-fade|m-page-moveFromLeft m-page-ontop',
            FADE_FROM_BOTTOM: 'm-page-fade|m-page-moveFromBottom m-page-ontop',
            FADE_FROM_TOP: 'm-page-fade|m-page-moveFromTop m-page-ontop',
            FADE_LEFT_FADE_RIGHT: 'm-page-moveToLeftFade|m-page-moveFromRightFade',
            FADE_RIGHT_FADE_LEFT: 'm-page-moveToRightFade|m-page-moveFromLeftFade',
            FADE_TOP_FADE_BOTTOM: 'm-page-moveToTopFade|m-page-moveFromBottomFade',
            FADE_BOTTOM_FADE_TOP: 'm-page-moveToBottomFade|m-page-moveFromTopFade',
            DIFFERENT_EASING_FROM_RIGHT: 'm-page-moveToLeftEasing m-page-ontop|m-page-moveFromRight',
            DIFFERENT_EASING_FROM_LEFT: 'm-page-moveToRightEasing m-page-ontop|m-page-moveFromLeft',
            DIFFERENT_EASING_FROM_BOTTOM: 'm-page-moveToTopEasing m-page-ontop|m-page-moveFromBottom',
            DIFFERENT_EASING_FROM_TOP: 'm-page-moveToBottomEasing m-page-ontop|m-page-moveFromTop',
            SCALE_DOWN_FROM_RIGHT: 'm-page-scaleDown|m-page-moveFromRight m-page-ontop',
            SCALE_DOWN_FROM_LEFT: 'm-page-scaleDown|m-page-moveFromLeft m-page-ontop',
            SCALE_DOWN_FROM_BOTTOM: 'm-page-scaleDown|m-page-moveFromBottom m-page-ontop',
            SCALE_DOWN_FROM_TOP: 'm-page-scaleDown|m-page-moveFromTop m-page-ontop',
            SCALE_DOWN_SCALE_DOWN: 'm-page-scaleDown|m-page-scaleUpDown m-page-delay300',
            SCALE_UP_SCALE_UP: 'm-page-scaleDownUp|m-page-scaleUp m-page-delay300',
            MOVE_TO_LEFT_SCALE_UP: 'm-page-moveToLeft m-page-ontop|m-page-scaleUp',
            MOVE_TO_RIGHT_SCALE_UP: 'm-page-moveToRight m-page-ontop|m-page-scaleUp',
            MOVE_TO_TOP_SCALE_UP: 'm-page-moveToTop m-page-ontop|m-page-scaleUp',
            MOVE_TO_BOTTOM_SCALE_UP: 'm-page-moveToBottom m-page-ontop|m-page-scaleUp',
            SCALE_DOWN_SCALE_UP: 'm-page-scaleDownCenter|m-page-scaleUpCenter m-page-delay400',
            GLUE_LEFT_FROM_RIGHT: 'm-page-rotateRightSideFirst|m-page-moveFromRight m-page-delay200 m-page-ontop',
            GLUE_RIGHT_FROM_LEFT: 'm-page-rotateLeftSideFirst|m-page-moveFromLeft m-page-delay200 m-page-ontop',
            GLUE_BOTTOM_FROM_TOP: 'm-page-rotateTopSideFirst|m-page-moveFromTop m-page-delay200 m-page-ontop',
            GLUE_TOP_FROM_BOTTOM: 'm-page-rotateBottomSideFirst|m-page-moveFromBottom m-page-delay200 m-page-ontop',
            FLIP_RIGHT: 'm-page-flipOutRight|m-page-flipInLeft m-page-delay500',
            FLIP_LEFT: 'm-page-flipOutLeft|m-page-flipInRight m-page-delay500',
            FLIP_TOP: 'm-page-flipOutTop|m-page-flipInBottom m-page-delay500',
            FLIP_BOTTOM: 'm-page-flipOutBottom|m-page-flipInTop m-page-delay500',
            FALL: 'm-page-rotateFall m-page-ontop|m-page-scaleUp',
            NEWSPAPER: 'm-page-rotateOutNewspaper|m-page-rotateInNewspaper m-page-delay500',
            PUSH_LEFT_FROM_RIGHT: 'm-page-rotatePushLeft|m-page-moveFromRight',
            PUSH_RIGHT_FROM_LEFT: 'm-page-rotatePushRight|m-page-moveFromLeft',
            PUSH_TOP_FROM_BOTTOM: 'm-page-rotatePushTop|m-page-moveFromBottom',
            PUSH_BOTTOM_FROM_TOP: 'm-page-rotatePushBottom|m-page-moveFromTop',
            PUSH_LEFT_PULL_RIGHT: 'm-page-rotatePushLeft|m-page-rotatePullRight m-page-delay180',
            PUSH_RIGHT_PULL_LEFT: 'm-page-rotatePushRight|m-page-rotatePullLeft m-page-delay180',
            PUSH_TOP_PULL_BOTTOM: 'm-page-rotatePushTop|m-page-rotatePullBottom m-page-delay180',
            PUSH_BOTTOM_PULL_TOP: 'm-page-rotatePushBottom|m-page-rotatePullTop m-page-delay180',
            FOLD_LEFT_FROM_RIGHT: 'm-page-rotateFoldLeft|m-page-moveFromRightFade',
            FOLD_RIGHT_FROM_LEFT: 'm-page-rotateFoldRight|m-page-moveFromLeftFade',
            FOLD_TOP_FROM_BOTTOM: 'm-page-rotateFoldTop|m-page-moveFromBottomFade',
            FOLD_BOTTOM_FROM_TOP: 'm-page-rotateFoldBottom|m-page-moveFromTopFade',
            MOVE_TO_RIGHT_UNFOLD_LEFT: 'm-page-moveToRightFade|m-page-rotateUnfoldLeft',
            MOVE_TO_LEFT_UNFOLD_RIGHT: 'm-page-moveToLeftFade|m-page-rotateUnfoldRight',
            MOVE_TO_BOTTOM_UNFOLD_TOP: 'm-page-moveToBottomFade|m-page-rotateUnfoldTop',
            MOVE_TO_TOP_UNFOLD_BOTTOM: 'm-page-moveToTopFade|m-page-rotateUnfoldBottom',
            ROOM_TO_LEFT: 'm-page-rotateRoomLeftOut m-page-ontop|m-page-rotateRoomLeftIn',
            ROOM_TO_RIGHT: 'm-page-rotateRoomRightOut m-page-ontop|m-page-rotateRoomRightIn',
            ROOM_TO_TOP: 'm-page-rotateRoomTopOut m-page-ontop|m-page-rotateRoomTopIn',
            ROOM_TO_BOTTOM: 'm-page-rotateRoomBottomOut m-page-ontop|m-page-rotateRoomBottomIn',
            CUBE_TO_LEFT: 'm-page-rotateCubeLeftOut m-page-ontop|m-page-rotateCubeLeftIn',
            CUBE_TO_RIGHT: 'm-page-rotateCubeRightOut m-page-ontop|m-page-rotateCubeRightIn',
            CUBE_TO_TOP: 'm-page-rotateCubeTopOut m-page-ontop|m-page-rotateCubeTopIn',
            CUBE_TO_BOTTOM: 'm-page-rotateCubeBottomOut m-page-ontop|m-page-rotateCubeBottomIn',
            CAROUSEL_TO_LEFT: 'm-page-rotateCarouselLeftOut m-page-ontop|m-page-rotateCarouselLeftIn',
            CAROUSEL_TO_RIGHT: 'm-page-rotateCarouselRightOut m-page-ontop|m-page-rotateCarouselRightIn',
            CAROUSEL_TO_TOP: 'm-page-rotateCarouselTopOut m-page-ontop|m-page-rotateCarouselTopIn',
            CAROUSEL_TO_BOTTOM: 'm-page-rotateCarouselBottomOut m-page-ontop|m-page-rotateCarouselBottomIn',
            SIDES: 'm-page-rotateSidesOut|m-page-rotateSidesIn m-page-delay200',
            SLIDE: 'm-page-rotateSlideOut|m-page-rotateSlideIn',
    
            _main: null,
            _iterate: null,
            _pages: null,
            _pagesCount: 0,
            _current: 0,
            _isAnimating: false,
            _endCurrPage: false,
            _endNextPage: false,
            _support: Modernizr.cssanimations,
            _animEndEventNames: {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            },
    
            init: function( main ) {
                this._animEndEventName = this._animEndEventNames[ Modernizr.prefixed('animation') ];
                this._main = main ? main : $('#m-main');
                this._pages = this._main.children('div.m-page');
                this._pagesCount = this._pages.length;
    
                this._pages.each(function() {
                    var page = $(this);
                    page.data('originalClassList', page.attr('class'));
                });
    
                this._pages.eq(this._current).addClass('m-page-current');
            },
    
            startTransition: function(options) {
                if( this._isAnimating ) {
                    return false;
                }
    
                // TODO dispatch a custom animation-start event.
                this._isAnimating = true;
    
                var currPage = this._pages.eq(this._current);
    
                if( this._current < this._pagesCount - 1 ) {
                    this._current += 1;
                } else {
                    this._current = 0;
                }
    
                var nextPage = this._pages.eq(this._current).addClass('m-page-current');
    
                if( !this._support || options.transition === M.PageTransitions.NONE ) {
                    this._onEndAnimation(currPage, nextPage);
                    return;
                }
    
                var transitionClasses = options.transition.split('|');
                var outClass = transitionClasses[0];
                var inClass = transitionClasses[1];
                var that = this;
    
                $(currPage[0]).on(that._animEndEventName, function() {
                    currPage.off(that._animEndEventName);
                    that._endCurrPage = true;
                    if( that._endNextPage ) {
                        that._onEndAnimation(currPage, nextPage);
                    }
                });
                currPage.addClass(outClass);
    
                $(nextPage[0]).on(that._animEndEventName, function() {
                    nextPage.off(that._animEndEventName);
                    that._endNextPage = true;
                    if( that._endCurrPage ) {
                        that._onEndAnimation(currPage, nextPage);
                    }
                });
                nextPage.addClass(inClass);
    
    
                $(document).on(this._animEndEventName, function( ev ) {
                    that._onEndAnimation(currPage, nextPage);
                });
            },
    
            _onEndAnimation: function(outpage, inpage){
                // TODO dispatch a custom animation-end event.
    
                this._endCurrPage = false;
                this._endNextPage = false;
    
                this._resetPage(outpage, inpage);
                this._isAnimating = false;
            },
    
            _resetPage: function(outpage, inpage){
                outpage.attr('class', outpage.data('originalClassList'));
                inpage.attr('class', inpage.data('originalClassList') + ' m-page-current');
            }
        });
    
    })(this);
    
    (function() {
    
        /**
         * M.View inherits from Backbone.View
         * @type {*}
         */
        M.View = Backbone.View.extend({
    
            /**
             * @constructor
             * @param {options} Attributes for the current Instance
             */
            constructor: function( options ) {
                this.cid = _.uniqueId('view');
                options = options || {};
                var viewOptions = ['scope', 'model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events', 'scopeKey', 'computedValue', 'onSet', 'onGet'];
                _.extend(this, _.pick(options, viewOptions));
                this._ensureElement();
                this.initialize.apply(this, arguments);
                this.delegateEvents();
            }
        });
    
        /**
         *
         * Extend M.View with the M.create function. You can use this function to create an M.View with the create function. Instances from Backbone are generated with new. This function wrapps the new.
         *
         * @type {Function}
         */
    
        M.View.create = M.create;
    
        /**
         *
         * Extend M.View with the M.design function. With the design you can extend an object and get an instance at once.
         *
         * @type {Function}
         */
    
        M.View.design = M.design;
    
        M.View.implements = M.implements;
    
        /**
         * Extend the M.View also from M.Object
         */
    
        _.extend(M.View.prototype, M.Object, {
    
            /**
             * @private
             * The View type
             */
            _type: 'M.View',
    
            /*
             * define a user template
             */
            template: null,
    
            /*
             * @private
             * define a template based on the tmpl template engine
             */
            _template: _.tmpl(M.TemplateManager.get('M.View')),
    
            /**
             * @private
             * use this property to define which data are given to the template
             */
            _templateValues: null,
    
            /**
             * extend the default template with this one. It gets injected into the <%= _value_ %> placeholder
             */
            templateExtend: null,
    
            /**
             * @private
             * Indicates if this is the view was rendered before
             *
             */
            _firstRender: YES,
    
            /**
             * Specify if the View has an surrounding DOM-Element or not
             */
            useElement: NO,
    
            /**
             * @private
             * Has the View a localization listener
             */
            _hasI18NListener: NO,
    
            /**
             * Model data to view value transformation.
             * Change the display value of a view. Use this if the model has another data format as the view representation accepts it.
             * @param value The value of a view
             * @returns {*} The value of a view
             */
            onSet: null,
    
            /**
             * View value to model data transformation.
             * Change the display value of a view back to the model data. Use this if the view has another data format as the model accepts it.
             * @param value The value of a view
             * @returns {*} The value of a view
             */
            onGet: null,
    
            /**
             * Bootstrap css wrap
             */
            cssClass: null,
    
            /**
             * Css classes for every single view
             */
            _internalCssClass: null,
    
            /**
             * Bootstrap css classes for a grid implementation
             */
            grid: null,
    
            /**
             * Store events from outside the framework here. Developer should use this to bind events on their views like they know it from backbone.
             */
            events: null,
    
            /**
             * internal framework events. This is used to store every event till the _registerEvents is called. _registerEvents binds only the events stored inside this attribute
             */
            _events: null,
    
            /**
             * The Value of the view
             */
            _value_: null,
    
    
            /**
             * The hammer.js event object
             */
            _hammertime: null,
    
            /**
             * Store the given events inside this attribute. The events object is set to null to prefent backbone of setting events. To not loose the information it gets stored.
             */
            _originalEvents: null,
    
            /**
             * Set the model of the view
             * @param { M.Model } The Model to be set
             * @returns {View}
             * @private
             */
            _setModel: function( value ) {
                this.model = value;
                return this;
            },
    
    
            /**
             * Get the Model for the View
             * @returns {M.Model}
             * @private
             */
            _getModel: function() {
                return this.model;
            },
    
    
            /**
             * Get the value of a view. If the value is a M.Model return its attributes.
             * @returns {*}
             */
            getValue: function() {
                if( this.model ) {
                    if( this._value_.hasOwnProperty('attribute') && this._value_.hasOwnProperty('model') ) {
                        return this._value_.model.get(this._value_.attribute);
                    }
                    return this._getModel().attributes;
                } else {
                    return this._value_;
                }
            },
    
            _getValue: function() {
                return this._value_;
            },
    
            _setValue: function( value ) {
    
                this._value_ = value;
            },
    
            getPropertyValue: function( propertyString, data ) {
                var o = data;
                _.each(propertyString.split('.'), function( key ) {
                    if( o[key] ) {
                        o = o[key];
                    } else if( M.isModel(o) || M.isCollection(o) ) {
                        //o = o.get(key);
                        o = {
                            model: o,
                            attribute: key
                        };
                    } else {
                        o = null;
                    }
                });
                return o;
            },
    
            /**
             *
             * @returns {*}
             */
    
            initialize: function( options ) {
                this._registerView();
                this._addInterfaces();
                this._assignValue(options);
                this._assignTemplateValues();
                this._mapEventsToScope(this.scope);
                this._addInternalEvents();
                this._addCustomEvents(this.scope);
                if( !this.useElement ) {
                    this._registerEvents();
                }
                this._assignContentBinding();
                //            this._assignComplexView();
                //            this.init();
                return this;
            },
    
            _registerView: function() {
                M.ViewManager.registerView(this);
            },
    
            _assignValue: function( options ) {
                //don't write _value_ in the view definition - write value and here it gets assigned
    
                if( this.value ) {
                    this._setValue(this.value);
                } else if( this.scopeKey ) {
                    this._setValue(this.getPropertyValue(this.scopeKey, this.scope));
                } else if( options && options.value ) {
                    this._setValue(options.value);
                }
    
                var _value_ = this._getValue();
    
                if( _value_ ) {
                    if( M.isModel(_value_.model) ) {
                        this._setModel(_value_.model);
                    } else if( M.isModel(_value_) ) {
                        this._setModel(_value_);
                    } else if( M.isCollection(_value_) ) {
                        this.collection = _value_;
                    }
                }
    
                if( this._reactOnLocaleChanged() ) {
                    M.I18N.on(M.CONST.I18N.LOCALE_CHANGED, function() {
                        this.render();
                    }, this);
                    this._hasI18NListener = YES;
                }
    
                return this;
            },
    
            _reactOnLocaleChanged: function() {
                return (this.value || this.label);
            },
    
    
            _assignContentBinding: function() {
                var that = this;
                var _value_ = this._getValue();
                if( this.scopeKey && M.isModel(_value_) ) {
                    this.listenTo(this.scope, this.scopeKey, function( model ) {
                        that._setModel(model);
                        that.render();
                    });
                }
    
                // TODO check if needed
                //            else if( this.scopeKey && _value_ && M.isModel(_value_.model) && _value_.attribute ) {
                //
                //                this.listenTo(this.scope, this.scopeKey.split('.')[0], function( model ) {
                //                    //                    that._value_.model.set(that._value_.attribute, model.get(that._value_.attribute));
                //                });
                //            }
                return this;
            },
    
            /**
             *
             * Prepares the events. Loops over all defined events and searchs for the callback function for every element. If the event is a string, search in the given scope for the callback function.
             * The event attribute of every object is also used by backbone. The event handling is done by hammer.js so we map the events to an internal used _events object delete the events.
             * Before that we store the events in an internal _originalEvents so the information isn't lost.
             * Every event type e.q. tap is an array to handle more than one callback function.
             *
             * @param scope
             * @returns {View}
             * @private
             */
            _mapEventsToScope: function( scope ) {
                // A swap object for the given events to assign it later to the _events object.
                var events = {};
                if( this.events ) {
                    _.each(this.events, function( value, key ) {
                        var callback = value;
                        // If the event callback type is an string, search in the given scope for a function
                        if( typeof value === 'string' && scope && typeof scope[value] === 'function' ) {
                            callback = scope[value];
                        }
                        // Create an array for the specific eventtype
                        events[key] = _.isArray(callback) ? callback : [callback];
                    }, this);
    
                    // Store the events object to not loose the information
                    this._originalEvents = this.events;
                    // backbone should not bind events so set it to null
                    this.events = null;
                }
                // events should be an object
                this._events = events;
    
                return this;
            },
    
    
            /**
             * Merge the internal events with the external ones.
             * @private
             */
            _addInternalEvents: function() {
                if( this._internalEvents ) {
                    _.each(this._internalEvents, function( internalEvent, eventType ) {
                        //if the _internalEvents isn't an array create one
                        var internal = _.isArray(internalEvent) ? internalEvent : [internalEvent];
                        //if the object has no _events or the object is not an array create one
                        this._events[eventType] = _.isArray(this._events[eventType]) ? this._events[eventType] : [];
                        //merge the interanl and external events
                        this._events[eventType] = this._events[eventType].concat(internal);
                    }, this);
                }
            },
    
            _addCustomEvents: function() {
                if( !this._events ) {
                    return;
                }
                var that = this;
                var customEvents = {
                    enter: {
                        'origin': 'keyup',
                        'callback': function( event ) {
                            if( event.keyCode === 13 ) {
                                that._events.enter.apply(that.scope, arguments);
                            }
    
                        }
                    }
                };
                for( var event in this._events ) {
                    if( customEvents.hasOwnProperty(event) ) {
                        this._events[customEvents[event].origin] = customEvents[event].callback;
                    }
                }
            },
    
            _getEventOptions: function() {
                return {
                    'prevent_default': false, // To prevent the ghost click
                    'no_mouseevents': true,
                    'stop_browser_behavior': false
                };
            },
    
            /**
             * Register events via hammer.js
             *
             * @private
             */
            _registerEvents: function() {
                if( this._events ) {
                    var that = this;
    
                    this._eventCallback = {};
                    Object.keys(this._events).forEach(function( eventName ) {
    
                        this._hammertime = new Hammer(that.el, that._getEventOptions());
    
                        this._eventCallback[eventName] = function( event ) {
                            var args = Array.prototype.slice.call(arguments);
                            args.push(that);
                            _.each(that._events[event.type], function( func ) {
                                func.apply(that.scope, args);
                            }, that);
                        };
                        this._hammertime.on(eventName, this._eventCallback[eventName]);
    
                    }, this);
                }
            },
    
            /**
             * Disable all events on this element. Events are still bound but not triggered. Wrapper for hammer.js.
             * See hammer.js docu: https://github.com/EightMedia/hammer.js/wiki/Instance-methods#hammertimeoffgesture-handler
             * @private
             */
            _disableEvents: function() {
                this._hammertime.enable(NO);
            },
    
            /**
             * Enable all events on this element when they where disabled. Wrapper for hammer.js.
             * See hammer.js docu: https://github.com/EightMedia/hammer.js/wiki/Instance-methods#hammertimeoffgesture-handler
             * @private
             */
            _enableEvents: function() {
                this._hammertime.enable(YES);
            },
    
            /**
             * implement render function
             * @returns {this}
             */
            render: function() {
                //this._assignValue();
                this._preRender();
                this._render();
                this._renderChildViews();
                this._postRender();
                return this;
            },
    
            _preRender: function() {
                this._assignTemplate();
                this._assignTemplateValues();
                this._extendTemplate();
                this.preRender();
                return this;
            },
    
            _assignTemplate: function( template ) {
                template = template || this.template;
                if( template ) {
                    if( typeof template === 'function' ) {
                        this._template = template;
                    } else if( _.isString(template) ) {
                        this._template = _.tmpl(template);
                    } else if( _.isObject(template) ) {
                        this._template = _.tmpl(M.TemplateManager.get.apply(this, ['template']));
                    }
                } else if( this._template ) {
                    this.template = this._template;
                }
                return this;
            },
    
            _assignTemplateValues: function() {
                this._templateValues = {};
                var _value_ = this._getValue();
    
                if( this.model ) {
                    if( M.isModel(_value_) ) {
                        this._templateValues = this.model.attributes;
                    } else {
                        this._templateValues._value_ = this.model.get(_value_.attribute);
                    }
                } else if( M.isI18NItem(_value_) ) {
                    this._templateValues._value_ = M.I18N.l(_value_.key, _value_.placeholder);
                } else if( typeof _value_ === 'string' ) {
                    this._templateValues._value_ = _value_;
                } else if( _value_ !== null && typeof _value_ === 'object' && this._hasI18NListener === NO ) {
                    this._templateValues = _value_;
                } else if( this._hasI18NListener && _.isObject(_value_) ) {
                    _.each(_value_, function( value, key ) {
                        this._templateValues[key] = M.I18N.l(value.key, value.placeholder);
                    }, this);
                }
            },
    
            _extendTemplate: function() {
                if( this.extendTemplate ) {
                    this._template = _.tmpl(this.template({_value_: this.extendTemplate}));
                }
            },
    
            preRender: function() {
    
            },
    
            _render: function() {
                var dom = this._template(this._templateValues);
    
                if( this.useElement ) {
                    this.setElement(dom);
                } else if( this._attachToDom() ) {
                    this.$el.html(dom);
                } else {
                    this.$el.html('');
                }
                return this;
            },
    
            /**
             * Specify if the template needs to be attached to the element or not.
             *
             * @returns {boolean}
             * @private
             */
            _attachToDom: function() {
                return this.getValue() !== null;
            },
    
            _renderChildViews: function() {
    
                if( !this.childViews ) {
                    return;
                    //this.childViews = this._getChildViews();
                }
                _.each(this.childViews, function( child, name ) {
                    var dom = this.$el;
                    //                if( this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]').addBack().length ) {
                    //                    dom = this.$el.find('[data-childviews="' + this.cid + '_' + name + '"]').addBack();
                    //                }
                    if( this.$el.find('[data-childviews="' + name + '"]').length ) {
                        dom = this.$el.find('[data-childviews="' + name + '"]');
                        dom.addClass(name);
                    }
    
                    if( typeof child.render === 'function' ) {
                        dom.append(child.render().$el);
                        child.delegateEvents();
                    } else if( _.isArray(child) ) {
                        _.each(child, function( c ) {
                            dom.append(c.render().$el);
                            c.delegateEvents();
                        });
                    }
    
                }, this);
    
                return this;
            },
    
            _postRender: function() {
                //use element can be given from the parent element
                if( this.useElement ) {
                    this._registerEvents();
                }
                this._addClassNames();
                if( this.model ) {
                    this._assignBinding();
                    this.stickit();
                }
                if( this.model && this.useElement ) {
                    //console.warn('be aware that stickit only works if you define useElement with NO');
                }
                this.postRender();
                this._firstRender = NO;
                return this;
            },
    
            _addClassNames: function() {
    
                this.$el.addClass(this._type.split('.')[1].toLowerCase());
                if( this.cssClass ) {
                    this.$el.addClass(this.cssClass);
                }
                if( this._internalCssClass ) {
                    this.$el.addClass(this._internalCssClass);
                }
                if( this.grid ) {
                    this.$el.addClass(this.grid);
                }
            },
    
            _assignBinding: function() {
                var bindings = {};
    
                var _value_ = this._getValue();
                var selector = '';
    
                if( this.model && !M.isModel(_value_) ) {
                    selector = '[data-binding="_value_"]';
                    bindings[selector] = {observe: '' + _value_.attribute};
                } else if( this.collection ) {
                    selector = '[data-binding="_value_"]';
                    bindings[selector] = {observe: '_value_'};
                } else if( this.model && M.isModel(_value_) ) {
                    _.each(this.model.attributes, function( value, key ) {
                        var selector = '[data-binding="' + key + '"]';
                        bindings[selector] = {observe: '' + key};
                    }, this);
                } else if( this.templateExtend === null && this.scopeKey ) {
                    selector = '[data-binding="_value_"]';
                    bindings[selector] = {observe: '' + this.scopeKey};
                } else {
                    _.each(this._templateValues, function( value, key ) {
                        selector = '[data-binding="' + key + '"]';
                        bindings[selector] = {observe: '' + key};
                    }, this);
                }
    
                _.each(bindings, function( value, key ) {
                    if( typeof this.onGet === 'function' ) {
                        bindings[key].onGet = function( value ) {
                            var ret = this.onGet(value);
                            return ret;
                        };
                    }
    
                    if( typeof this.onSet === 'function' ) {
                        bindings[key].onSet = function( value ) {
                            var ret = this.onSet(value);
                            return ret;
                        };
                    }
                }, this);
    
                this.bindings = bindings;
    
                return this;
            },
    
            postRender: function() {
    
            },
    
            updateTemplate: function() {
                var template = this.template || M.TemplateManager.get(this._type);
                this._assignTemplate(template);
                this._updateChildViewsTemplate();
                return this;
            },
    
            _updateChildViewsTemplate: function() {
    
                if( !this.childViews ) {
                    return;
                }
                _.each(this.childViews, function( child ) {
                    if( typeof child.updateTemplate === 'function' ) {
                        child.updateTemplate();
                    } else if( _.isArray(child) ) {
                        _.each(child, function( c ) {
                            c.updateTemplate();
                        });
                    }
    
                }, this);
                return this;
            },
    
            addChildView: function( selector, view ) {
                if( _.isObject(selector) ) {
                    _.each(selector, function(view, selector){
                        this.childViews[selector] = view;
                    }, this);
                } else {
                    this.childViews[selector] = view;
                }
    
            },
    
            /**
             * Remove all events to the given eventtype
             * @param {String} The eventtype e.q. tap
             * @private
             * @todo removing an event by its name removes all bound event callbacks. At the moment it isn't possible to remove a single eventype function.
             * @example
             *
             * //Create a view with an tap event
             * var view = M.View.extend({
             *   events: {
             *      tap: function(){console.log('tap did happen')}
             *   }
             * }).create().render();
             *
             * //Log all bound events (Chrome provides the getEventListeners function to log all event on an DOM object)
             * getEventListeners(view.el); // Object {touchstart: Array[1], mousedown: Array[1], tap: Array[1]}
             *
             * //Remove all tap events
             * view._unbindEvent('tap');
             *
             * //Log again
             * getEventListeners(view.el); //Object {touchstart: Array[1], mousedown: Array[1]}
             */
            _unbindEvent: function( eventtype ) {
                this._hammertime.off(eventtype, this._eventCallback[eventtype]);
            },
    
    
            /**
             *
             * Returns a childview of an object either by the name or the index of the childview
             * @param {(string|number)} the index or name of the childview
             * @private
             * @example
             *
             * v
             * var testView = M.View.extend({}, {
             *    child1: M.View.extend({value: 'child 1 value'}),
             *    child2: M.View.extend({value: 'child 2 value'})
             * }).create();
             *
             * testView._getChildView(0);  //child1
             * testView._getChildView(1);  //child2
             * testView._getChildView('child1');  //child1
             * testView._getChildView('child2');  //child2
             * testView._getChildView('child2');  //child2
             */
            _getChildView: function( identifier ) {
                var ident = parseInt(identifier, 10);
                if( !_.isNaN(ident) ){
                    identifier = ident;
                }
                var childName = _.isNumber(identifier) ? Object.keys(this.childViews)[identifier] : identifier;
                return this.childViews[childName];
            }
    
        });
    
        /**
         * extend the Backbone.View extend function with a childViews parameter
         * @param options
         * @param childViews
         * @returns {*}
         */
        M.View.extend = function( options, childViews ) {
            options = options || {};
            if( childViews ) {
                options._childViews = childViews;
            }
            return Backbone.View.extend.apply(this, [options]);
        };
    
        /**
         *
         * @param scope
         * @returns {this}
         */
        M.View.create = function( scope, childViews, isScope ) {
    
            var _scope = isScope ? {scope: scope} : scope;
            var f = new this(_scope);
            f.childViews = {};
            if( f._childViews ) {
                _.each(f._childViews, function( childView, name ) {
                    var _scope = scope;
                    if( f.useAsScope === YES ) {
                        _scope = f;
    
                    }
                    f.childViews[name] = childView.create(_scope || f, null, true);
                });
            }
            if( childViews ) {
                f.childViews = f.childViews || {};
                _.each(childViews, function( childView, name ) {
                    f.childViews[name] = childView;
                });
            }
            return f;
        };
    
        M.View.design = M.View.prototype.design = function() {
            return this.extend().create();
        };
    
    })(this);
    
    // ==========================================================================
    // Project:   The M-Project - Mobile HTML5 Application Framework
    // Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
    //            (c) 2013 panacoda GmbH. All rights reserved.
    // Creator:   Dominik
    // Date:      07.05.2013
    // License:   Dual licensed under the MIT or GPL Version 2 licenses.
    //            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
    //            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
    // ==========================================================================
    
    /**
     * @class
     * @extends M.View
     */
    
    M.Layout = M.View.extend(/** @scope M.Layout.prototype */{
    
        //el: $(".m-perspective"),
    
        /**
         * The type of this object.
         *
         * @type String
         */
        _type: 'M.Layout',
    
        /**
         * This property is used to identify M.Layout and all of its derived object
         * as layouts.
         *
         * @type Boolean
         */
        isMLayout: YES,
    
        template: '<div></div>',
    
        childViews: {},
    
        applyViews: function() {
    
        },
    
        _attachToDom: function() {
            return YES;
        },
        startTransition: function( options ) {
            M.PageTransitions.startTransition(options);
        }
    });
    M.Themes = M.Object.design({
        DEFAULT_THEME: 'basic',
    
        basic: {},
    
        _currentThemeName: 'basic',
    
        _themes: {},
    
        registerTemplateForTheme: function (themeName, templateName, template, override) {
            override = override || false;
    
            var theme = this._getThemeByName(themeName);
            if (!theme) {
                this._createThemeWithName(themeName);
            }
    
            var exists = this._getTemplateByNameForTheme(themeName, templateName) !== '';
            if (!exists || override) {
                this._themes[ themeName ][ templateName ] = template;
                return true;
            }
    
            console.warn('Template "' + templateName + '" already defined for theme "' + themeName + '"');
            return false;
        },
    
        getTemplateByName: function (templateName) {
    
            var template = this.getTemplateByNameForTheme(this._currentThemeName, templateName);
            if (template === '' && this._currentThemeName !== this.DEFAULT_THEME) {
                console.log('Template "' + templateName + '" not defined for theme "' + this._currentThemeName + '", switched to default theme "' + this.DEFAULT_THEME + '"');
                template = this.getTemplateByNameForTheme(this.DEFAULT_THEME, templateName);
            }
            return template;
        },
    
        getTemplateByNameForTheme: function (themeName, templateName) {
            var template = this._getTemplateByNameForTheme(themeName, templateName);
            if (template) {
                return template;
            }
            console.warn('Template "' + templateName + '" not defined for theme "' + themeName + '"');
            return '';
        },
    
        _getTemplateByNameForTheme: function (themeName, templateName) {
            var theme = this._getThemeByName(themeName);
            if (theme && theme[templateName]) {
                return theme[templateName];
            }
            return '';
        },
    
        _createThemeWithName: function (name) {
            this._themes[ name ] = {};
        },
    
        _getThemeByName: function (name) {
            if (this._themes[ name ]) {
                return this._themes[ name ];
            }
            return null;
        }
    });
    
    
    M.TextfieldView = M.View.extend({
    
        _type: 'M.TextfieldView',
    
        label: null,
    
        type: 'text',
    
        _template: _.tmpl(M.TemplateManager.get('M.TextfieldView')),
    
        _assignTemplateValues: function () {
            M.View.prototype._assignTemplateValues.apply(this);
            if (M.isI18NItem(this.label)) {
                this._templateValues.label = M.I18N.l(this.label.key, this.label.placeholder);
            } else {
                this._templateValues.label = this.label || '';
            }
    
            this._templateValues.type = this.type;
    
        },
    
        initialize: function () {
            M.View.prototype.initialize.apply(this);
        },
    
        _attachToDom: function () {
            return YES;
        }
    });
    M.SearchfieldView = M.TextfieldView.extend({
    
        _type: 'M.SearchfieldView',
    
        placeholder: 'Search',
    
        _template: _.tmpl(M.TemplateManager.get('M.SearchfieldView')),
    
        initialize: function () {
            M.View.prototype.initialize.apply(this);
        },
    
        _assignTemplateValues: function () {
            M.TextfieldView.prototype._assignTemplateValues.apply(this);
            this._templateValues.placeholder = this.placeholder || '';
        }
    });
    
    M.TextareaView = M.TextfieldView.extend({
    
        _type: 'M.TextareaView',
    
        _template: _.tmpl(M.TemplateManager.get('M.TextareaView')),
    
        _attachToDom: function () {
            return YES;
        }
    });
    M.ListItemView = M.View.extend({
        _type: 'M.ListItemView',
        template: _.tmpl(M.TemplateManager.get('M.ListItemView')),
        initialize: function () {
            M.View.prototype.initialize.apply(this, arguments);
            if (this.templateExtend) {
                this.template = _.tmpl(this.template({value: this.templateExtend}));
            }
        }
    });
    /**
     * M.ButtonView inherits from M.View
     * @type {*}
     */
    
    M.BUTTON_VIEW = 'M.ButtonView';
    
    M.ButtonView = M.View.extend({
    
        /**
         * The type of the object
         * @private
         */
        _type: M.BUTTON_VIEW,
    
        /**
         * The template of the object before initializing it.
         * @private
         */
        _template: _.tmpl(M.TemplateManager.get(M.BUTTON_VIEW)),
    
        /**
         * The active state of the button. Use isActive and setActive to change this property.
         * @private
         */
        _isAcitve: YES,
    
        _assignTemplateValues: function(){
            M.View.prototype._assignTemplateValues.apply(this, arguments);
            this._templateValues.icon = this.icon ? this.icon : '';
        },
    
        isActive: function () {
            return this._isActive();
        },
    
        activate: function () {
    
            this._isAcitve = YES;
            this.$el.addClass('active');
    
        },
    
        deactivate: function () {
            this._isAcitve = NO;
            this.$el.removeClass('active');
        }
    
    }).implements([M.ViewEnableState]);
    M.ListView = M.View.extend({
        _type: 'M.ListView',
    
        _viewModelMapping: null,
    
        _template: _.tmpl(M.TemplateManager.get('M.ListView')),
    
        _render: function () {
            M.View.prototype._render.apply(this, arguments);
        },
    
        _renderChildViews: function () {
            if (this.collection) {
                this.addItems(this.collection.models);
            }
        },
    
        initialize: function () {
            M.View.prototype.initialize.apply(this, arguments);
    
            if (this.collection) {
                this._applyListener();
            }
            this._viewModelMapping = {};
        },
    
        _applyListener: function () {
    
    
            this.listenTo(this.collection, 'add', function (model) {
                console.log('add');
                this.addItem(model);
            });
    
            this.listenTo(this.collection, 'fetch', function () {
                console.log('fetch');
                //that.addAll();
            });
            this.listenTo(this.collection, 'change', function () {
                console.log('change!');
                //that.addAll();
            });
            this.listenTo(this.collection, 'remove', function (model) {
                this._viewModelMapping[model.cid].$el.remove();
            });
    
            this.listenTo(this.collection, 'filter', function () {
                console.log('filter');
                //this.addItems(models);
            });
    
            this.listenTo(this.collection, 'sort', function () {
                //this.addItems(this.collection.models);
                console.timeEnd('a');
            });
        },
    
        addItems: function (models) {
            _.each(models, function (model) {
                this.addItem(model);
            }, this);
        },
    
        addItem: function (model) {
            var view = null;
            if (this.listItemView) {
                view = this.listItemView.create({
                    scope: this.scope,
                    value: model
                });
                view.render();
                this.$el.find('[data-childviews="list"]').append(view.$el);
                this._viewModelMapping[view.model.cid] = view;
                view.delegateEvents();
            }
        }
    });
    M.SliderView = M.View.extend({
    
        _type: 'M.SliderView',
        _template: _.tmpl(M.TemplateManager.get('M.SliderView')),
        _getEventOptions: function () {
            return {
                'prevent_default': false,
                'no_mouseevents': true
            };
        }
    
    });
    M.DialogView = M.View.extend({
    
        _type: 'M.DialogView',
        _template: _.tmpl(M.TemplateManager.get('M.DialogView'))
    
    
    });
    M.ToggleView = M.View.extend({
    
        _type: 'M.ToggleView',
    
        _template: _.tmpl(M.TemplateManager.get('M.ToggleView')),
    
        initialize: function () {
            M.View.prototype.initialize.apply(this, arguments);
        },
    
        render: function (settings) {
            //this._assignValue();
            this._preRender(settings);
            this._render(settings);
            this._renderChildViews(settings);
            this._postRender(settings);
            return this;
        }
    
    });
    M.ImageView = M.View.extend({
    
        _type: 'M.ImageView',
        _template: _.tmpl(M.TemplateManager.get('M.ImageView')),
    
        /**
         * Represents the alt attribute of the img tag
         */
        alt: null,
    
        initialize: function () {
            M.View.prototype.initialize.apply(this, arguments);
            this.alt = this.alt || '';
            return this;
        },
    
        /**
         * Override this function to add 'alt' parameter
         * @private
         * @returns this
         */
        _assignTemplateValues: function () {
    
            M.View.prototype._assignTemplateValues.apply(this, arguments);
    
            if (this.model) {
                if (M.isModel(this._value_)) {
                } else {
                    this._templateValues.alt = this.model.get(this.alt.attribute);
                }
            } else if (this._value_) {
                this._templateValues.alt = this.alt;
            }
            return this;
        }
    });
    M.LoaderView = M.View.extend({
    
        _type: 'M.LoaderView',
    
        _template: _.tmpl(M.TemplateManager.get('M.LoaderView')),
    
        initialize: function () {
            M.View.prototype.initialize.apply(this, arguments);
        },
    
        render: function (settings) {
            //this._assignValue();
            this._preRender(settings);
            this._render(settings);
            this._renderChildViews(settings);
            this._postRender(settings);
            return this;
        },
    
        show: function () {
            $('html').addClass('ui-loading');
            return this;
        },
    
        hide: function () {
            $('html').removeClass('ui-loading');
            return this;
        },
    
        isShown: function () {
            return $('html').hasClass('ui-loading');
        },
    
        toggle: function () {
            if(this.isShown()) {
                this.hide();
            } else {
                this.show();
            }
        }
    });
    M.Toast = M.View.extend({
    
        _type: 'M.ToastView',
    
        template: '<div class="toast"><div id="<%= id %>"><%= text %></div></div>',
    
        id: null,
    
        initialize: function (settings) {
            var that = this;
            that.id = _.uniqueId();
            that.text = settings.text || M.Toast.TEXT;
            $('body').append(this.render().$el);
    
            setTimeout(function () {
                that.remove();
            }, settings.timeout || M.Toast.MEDIUM);
        },
    
        _assignTemplateValues: function () {
            this._templateValues = {
                id: this.id,
                text: this.text
            };
        }
    
    });
    
    M.Toast.show = function (settings) {
        if (typeof settings === 'string') {
            settings = {
                text: settings
            };
        }
        return M.Toast.create(settings);
    };
    
    M.Toast.RAW = 500;
    M.Toast.MEDIUM = 2000;
    M.Toast.CRISPY = 4000;
    M.Toast.TEXT = '';
    M.ToolbarView = M.View.extend({
    
        _type: 'M.ToolbarView',
    
        _template: _.tmpl(M.TemplateManager.get('M.ToolbarView'))
    
    
    });
    M.SelectionListView = M.View.extend({
    
        _type: 'M.SelectionListView',
    
        isMultiple: NO,
    
        template: M.TemplateManager.get('M.SelectionListView'),
    
        _assignBinding: function () {
            M.View.prototype._assignBinding.apply(this, arguments);
            if (this.selectOptions) {
                _.each(this.bindings, function (value) {
                    value.selectOptions = this.selectOptions;
                }, this);
            }
            return this;
        },
    
        _assignTemplateValues: function () {
            M.View.prototype._assignTemplateValues.apply(this);
            this._templateValues.isMultiple = this.isMultiple;
        }
    });
    M.DebugView = M.View.extend({
    
        _type: 'M.DebugView',
        _template: _.tmpl(M.TemplateManager.get('M.DebugView')),
    
        useAsScope: YES,
    
        toggleGrid: function () {
            this.childViews['debug-grid'].$el.toggle();
        }
    
    }, {
        'debug-menu': M.View.extend({
    
            cssClass: 'debug-menu'
        }, {
            toggleGrid: M.ButtonView.extend({
    
    
                value: 'toggle grid',
    
                events: {
                    tap: 'toggleGrid'
                }
            })
    
        }),
    
        'debug-grid': M.View.extend({
            useElement: YES,
            template: '<div class="debug-container"><div class="container debug-grid"><div class="row"> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> <div class="col-xs-1"><div class="inner"></div></div> </div></div></div>'
        })
    });
    M.ButtonGroupView = M.View.extend({
    
        _type: 'M.ButtonGroupView',
    
        _template: _.tmpl(M.TemplateManager.get('M.ButtonGroupView')),
    
        _internalCssClass: 'clearfix',
    
        setActive: function (view) {
    
            var setActiveView = M.isView(view) ? view : this._getChildView(view);
            _.each(this.childViews, function (child) {
                child.deactivate();
            }, this);
            setActiveView.activate();
        },
    
        getActive: function () {
            return _.find(this._childViews, function (view) {
                return view.isActive();
            }, this);
        },
    
        initialize: function () {
            M.View.prototype.initialize.apply(this, arguments);
            var that = this;
            if (this._childViews) {
                var gridSize = M.CONST.GRID.COLUMNS / Object.keys(this._childViews).length;
                _.each(this._childViews, function (child, key) {
                    this._childViews[key] = child.extend({
                        grid: 'col-xs-' + gridSize,
                        _internalEvents: {
                            tap: [function (events, element) {
                                that.setActive(element);
                            }]
                        }
                    });
                }, this);
            }
    
        },
    
        _addClassNames: function(){
            M.View.prototype._addClassNames.apply(this, arguments);
        }
    });
    
    M.TabView = M.View.extend({
        _type: 'M.TabView',
        cssClass: 'm-page m-tab'
    });
    
    M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'header-layout', '<div data-childviews="header" class="header"></div>');
    
    M.HeaderLayout = M.Layout.extend({
    
        _type: 'header-layout',
    
        template: M.Themes.getTemplateByName('header-layout'),
    
        applyViews: function( settings ) {
    
    
            var ident = 'header';
    
            if(!this.childViews[ident] && settings.header){
                this.addChildView(ident, settings.header);
            }
    
            if( settings.header && !this._firstRender ) {
                this.$el.find('[data-childviews="' + ident + '"]').html('');
                this.$el.find('[data-childviews="' + ident + '"]').html(settings.header.render().$el);
            }
    
            return this;
        }
    
    });
    //
    M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'bottom-bar-layout', '<div class="bottom-bar"></div>' );
    
    M.BottomBarLayout = M.Layout.extend({
    
        _type: 'bottom-bar-layout',
    
        template: M.Themes.getTemplateByName('bottom-bar-layout')
    });
    M.Themes.registerTemplateForTheme(M.Themes.DEFAULT_THEME, 'switch-layout', '<div id="m-main" class="m-perspective"><div class="m-page m-page-1"><div data-childviews="content_page1"></div></div><div class="m-page m-page-2"><div data-childviews="content_page2"></div></div></div>');
    
    M.SwitchLayout = M.Layout.extend({
    
        _type: 'M.SwitchLayout',
    
        template: M.Themes.getTemplateByName('switch-layout'),
    
        currentPage: null,
    
        applyViews: function( settings ){
    
            if(this.currentPage === null || this.currentPage === undefined || this.currentPage === 'content_page2'){
                this.currentPage = 'content_page1';
    
            } else if(this.currentPage === 'content_page1'){
                this.currentPage = 'content_page2';
            }
    
            if(!this.childViews[this.currentPage]){
                if(settings.content){
                    this.addChildView(this.currentPage, settings.content);
                }
    
            } else if(this.childViews[this.currentPage] !== settings.content){
                if(settings.content){
                    this.addChildView(this.currentPage, settings.content);
                }
    
            }
    
            if(!this._firstRender){
                //clear the dom before inserting the view
                this.$el.find('[data-childviews="' + this.currentPage + '"]').html('');
                //insert the view
                this.$el.find('[data-childviews="' + this.currentPage + '"]').html(settings.content.render().$el);
            }
    
    
            return this;
        },
    
        _render: function(){
            M.Layout.prototype._render.apply(this, arguments);
        },
    
        _postRender: function(){
            if(this._firstRender){
                M.PageTransitions.init(this.$el.find('#m-main'));
            }
            M.Layout.prototype._postRender.apply(this, arguments);
        },
    
        startTransition: function(options){
            M.PageTransitions.startTransition(options);
        }
    });
    
    //TODO do this in good
    var template = $('<div class="wrap"> <div class="left-panel firstLeft"> <div class="action-menu-close"></div> <div class="content"></div> </div> <div class="right-panel"> <div class="content"></div> </div> </div>');
    template.find('.right-panel').before(M.SwitchLayout.prototype.template);
    
    M.Themes.registerTemplateForTheme( M.Themes.DEFAULT_THEME, 'swipe-layout', template );
    
    M.SwipeLayout = M.SwitchLayout.extend({
    
        _type: 'M.SwipeLayout',
    
        template: M.Themes.getTemplateByName('swipe-layout'),
    
        leftPanelIsOpen: null,
    
        rightThreshold: null,
    
        initialize: function() {
            M.SwitchLayout.prototype.initialize.call(this);
    
            var w = $(window).width();
            this.rightThreshold = (w / 100) * 80;
        },
    
        toggleRightPanel: function() {
            this.closeLeftPanel();
            $('.right-panel').toggleClass('show');
        },
    
        closeRightPanel: function() {
            $('.right-panel').removeClass('show');
        },
    
        toggleLeftPanel: function() {
            this.closeRightPanel();
            if( this.leftPanelIsOpen ) {
                this.closeLeftPanel();
            } else {
                this.openLeftPanel();
            }
        },
    
        startMoveLeftPanel: function( evt ) {
            if( !evt || !evt.originalEvent ) {
                return;
            }
            evt.stopPropagation();
            evt.preventDefault();
            var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
    
            if( this.leftPanelIsOpen ) {
                this.moveStart = 0;
            } else {
                this.moveStart = touch.pageX;
            }
        },
    
        stopMoveLeftPanel: function( evt ) {
            evt.stopPropagation();
            evt.preventDefault();
            $('#m-main').addClass('easing');
    
            if( this.leftPanelIsOpen ) {
                this.closeLeftPanel();
            } else {
                this.openLeftPanel();
            }
    
            setTimeout(function() {
                $('#m-main').removeClass('easing');
            }, 500);
    
        },
    
        moveLeftPanel: function( evt ) {
            //                if(!evt || !evt.originalEvent){
            //                    return;
            //                }
            //                evt.stopPropagation();
            //                evt.preventDefault();
            var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
    
            var diff = touch.pageX - this.moveStart;
            if( diff <= 0 ) {
                diff = 0;
            } else if( diff >= this.rightThreshold ) {
                diff = this.rightThreshold;
            } else {
                $('#m-main').css('-webkit-transform', 'translate3d(' + diff + 'px, 0, 0)');
            }
    
            //        -webkit-transform: translate3d(80%, 0, 0);
            //        -moz-transform: translate3d(80%, 0, 0);
            //        -ms-transform: translate3d(80%, 0, 0);
            //        -o-transform: translate3d(80%, 0, 0);
            //        transform: translate3d(80%, 0, 0);
        },
    
        closeLeftPanel: function() {
            //$('.os-bb10 .template-bottom, .os-bb10 .template-right').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
            $('#m-main').css('-webkit-transform', 'translate3d(' + 0 + 'px, 0, 0)');
            this.leftPanelIsOpen = false;
        },
    
        openLeftPanel: function() {
            $('#m-main').css('-webkit-transform', 'translate3d(' + this.rightThreshold + 'px, 0, 0)');
            this.leftPanelIsOpen = true;
        }
    });
    
    M.TabLayout = M.Layout.extend({
    
        _tabMenu: null,
    
        _type: 'M.TabLayout',
    
        scrolling: NO,
    
        smoothScrollAnimation: YES,
    
        template: '<div id="m-main" class="m-perspective"><div data-childviews="tab-menu"></div><div data-childviews="tab-content"></div></div>',
    
        initialize: function() {
            this._tabMenu = M.ButtonGroupView.extend({}, {}).create(this, null, YES);
        },
    
        _render: function() {
            M.Layout.prototype._render.apply(this, arguments);
        },
    
        _postRender: function() {
            M.Layout.prototype._postRender.apply(this, arguments);
            this.$el.addClass(this.scrolling ? 'scrolling' : '');
            this.$scrollContainer = this.$el.find('[data-childviews=tab-menu]');
            if(this.scrolling){
                var width = M.SassVars['tablayout-menu-scroll-button-width'] * Object.keys(this._tabMenu.childViews).length;
                this.$scrollContainer.children('.buttongroupview').css('width', width + 'px');
            }
    
        },
    
        switchToTab: function( index ) {
            if( index < 0 || index >= Object.keys(this._tabMenu.childViews).length ) {
                return;
            }
            this._scrollToTab(index);
            this._tabMenu.setActive(index);
            this.$el.find('.m-tab.m-page-current').removeClass('m-page-current');
            this.childViews['tab-content'][index].$el.addClass('m-page-current');
        },
    
        _scrollToTab: function( index ) {
            if(!this.$scrollContainer){
                return;
            }
            var buttonWidth = M.SassVars['tablayout-menu-scroll-button-width'];
            var toPos = index * buttonWidth - 50;
            if( this.smoothScrollAnimation ) {
    
                this.$scrollContainer.animate({
                    scrollLeft: toPos
                }, 200);
    
            } else {
                this.$scrollContainer.scrollLeft(toPos);
            }
    
        },
    
    
        applyViews: function( tabs ) {
    
            var that = this;
    
            var contents = [];
            var grid = 'col-xs-' + Math.floor(12 / tabs.length);
            if( this.scrolling ) {
                grid = '';
            }
            for( var t = 0; t < tabs.length; t++ ) {
                var button = this._createButton({
                    index: t,
                    grid: grid,
                    headline: tabs[t].headline,
                    icon: tabs[t].icon
                });
                this._tabMenu.addChildView('button' + t, button);
                contents.push(this._extendContent({
                    index: t,
                    content: tabs[t].content
                }));
            }
    
            this.addChildView('tab-menu', this._tabMenu);
            this.addChildView('tab-content', contents);
        },
    
        _createButton: function( options ) {
            var that = this;
            return M.ButtonView.extend({
                value: options.headline,
                index: options.index,
                grid: options.grid,
                icon: options.icon,
                events: {
                    tap: function( event, element ) {
                        that.switchToTab(element.index);
                    }
                }
            }).create();
        },
    
        _extendContent: function( options ) {
            var that = this;
            return options.content.extend({
                events: {
                    dragleft: function( event, element ) {
                        that.switchToTab(options.index + 1);
                    },
                    dragright: function( event, element ) {
                        that.switchToTab(options.index - 1);
                    }
                }
            }).create();
        }
    
    });
    

})(this, Backbone, _, $);
