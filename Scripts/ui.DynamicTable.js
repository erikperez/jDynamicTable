/**
 * Created by IntelliJ IDEA.
 * User: Diabl0
 * Date: Jul 29, 2010
 * Time: 11:52:06 PM
 * To change this template use File | Settings | File Templates.
 */
(function($, undefined) {

    $.widget("ui.dynamictable", {
        // default options
        options: {
            columns: ["c1", "c2", "c3", "c4"],
            columnData:

                    [
                        [ "r1c1", "r1c2", "r1c3", "r1c4"],
                        [ "r2c1", "r2c2", "r2c3", "r2c4"],
                        [ "r3c1", "r3c2", "r3c3", "r3c4"],
                        [ "r4c1", "r4c2", "r4c3", "r4c4"]

                    ],

            caption: 'TestTable',
            style: true,
            hidden: false,
            sourceType: "array",
            sourceUrl: "http://localhost/json/"

        },
        _create: function() {
            // creation code for mywidget
            // can use this.options
            if (this.options.hidden) {
                // and this.element
                this.element.hide();
            }
            this._createStructure()
        },
        _createStructure: function() {
            // internal functions should be named with a leading underscore
            // manipulate the widget

            this.element.append('<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-top" style="line-height:20px;width:300px;height:22px;padding-left:20px;">' + this.options.caption + '</h1>');

            this.element.append('<table id="myTable" class=" ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active" style="width:322px;" cellspacing="0" cellspacing="0">' +
                    '' + this._createHeader());


            this.element.append('</table>');


        },

        _createHeader: function() {
            var tableHeaderData = '';

            for (var i = 0; i < this.options.columns.length; i++) {
                tableHeaderData += '<th>' + this.options.columns[i] + '</th>';

            }


            var header = '<thead> <tr>' + tableHeaderData + '</tr> </thead>';


            console.log(this._createBody());

            header += this._createBody();

            console.log(header);
            return header;
        }

        ,

        _createBody: function() {


            console.log("columnData 0 length: " + this.options.columnData[0].length);

            var tableBodyData = "";
            var oddOrEven = "odd";

            if(this.options.sourceType == "json")
                return this._populateFromJson();

            if (this.options.sourceType == "array") {

                for (var j = 0; j < this.options.columnData.length; j++) {

                    console.log(tableBodyData + j);

                    if (j % 2 == 0)
                        tableBodyData += '<tr class="odd">';
                    else
                        tableBodyData += '<tr class="even">';

                    for (var i = 0; i < this.options.columnData[j].length; i++)
                        tableBodyData += '<td>' + this.options.columnData[j][i] + '</td>';


                    tableBodyData += '</tr>';


                }


                var header = '<tbody>' + tableBodyData + '</tbody>';


                return header;
            }
            else if(this.options.sourceType == "json"){

                if(this.options.sourceUrl != '')
                console.log("u need to set the url");

            }
        }
        /*,
        _populateFromJson: function(){
            $.ajax(function(e){
                data: "test",
                dataType: "json",
                url: this.options.sourceUrl,
                success: function(data){


                }

        })}
    */
    });


})(jQuery);
