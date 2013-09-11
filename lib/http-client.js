/**
 * Copyright (c) ActiveState 2013 - ALL RIGHTS RESERVED.
 */

define([
    'jquery',
    'cloud-foundry-client/lib/utils'],
    function ($, Utils) {

        /**
         * Parses the response to an HTTP request to JSON.
         * If parsing fails the original response string will be returned.
         */
        var parseResponse = function (jqXHR) {
            try {
                return JSON.parse(jqXHR.responseText)
            } catch (e) {
                return jqXHR.responseText;
            }
        };

        var http_client = function () {

        };

        http_client.prototype = {

            request: function (url, options, done) {
                $.ajax({
                        url: url,
                        accept: "application/json",
                        contentType: options.data ? "application/json" : "",
                        dataType: "json",
                        type: options.verb,
                        async: true,
                        data: options.data ? JSON.stringify(options.data) : null,
                        timeout: options.timeout || 30000,
                        headers: options.headers,
                        processData: false,
                        cache: false,
                        complete: function (jqXHR, textStatus) {

                            var response = {
                                status_code: jqXHR.status,
                                body: parseResponse(jqXHR),
                                headers: Utils.parseHttpHeaders(jqXHR.getAllResponseHeaders()),
                                jqXHR: jqXHR
                            };

                            if (textStatus === "success") {
                                done(null, response);
                            } else {
                                done(textStatus, response);
                            }
                        }}
                );
            }
        };

        return http_client;
    }
);