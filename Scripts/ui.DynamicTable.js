(function($, undefined) {
    var self = null;
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

            caption: "TestTable",
            style: true,
            hidden: false,
            sourceType: "array",
            sourceUrl: "http://localhost/json/",
            width:"400px",
            height:"200px"

        },
        _create: function() {
            // creation code for mywidget
            // can use this.options
            self = this.element;

            if (this.options.hidden) {
                this.element.hide();
            }

            appendStyle(self, "height:"+this.options.height);
            appendStyle(self, "width:"+this.options.width);


            this._createStructure()
        },
        _createStructure: function() {
            // internal functions should be named with a leading underscore
            // manipulate the widget
            var $outerDiv = $("<div />");
            $outerDiv.addClass('outerDiv');

            
            $topDiv = $("<div />");
            $topDiv.addClass("ui-accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-corner-top");
            
            var $h3 = $("<h3 />");
            $h3.text(this.options.caption);
            $topDiv.append($h3);

            $outerDiv.append($topDiv);

            var $table = $("<table />");
            $table.addClass("fullsize");
            $table.attr('id', 'myTable');
            //$table.attr('cellpadding', 0);
            $table.attr('cellspacing', 0);
            
            $tableHeader = this._createHeader();
            $tableBody = this._createBody();
            $table.append($tableHeader);
            $table.append($tableBody);
            
            $outerDiv.append($table);
            this.element.append($outerDiv); 

        },
        _createHeader: function() {
            var tableHeaderData = '';

            for (var i = 0; i < this.options.columns.length; i++) {
                tableHeaderData += '<th>' + this.options.columns[i] + '</th>';
            }
            
            var header = '<thead> <tr>' + tableHeaderData + '</tr> </thead>';
            
            return header;
        }

        ,
        _createBody: function() {
            var tableBodyData = "";
            var oddOrEven = "odd";

            if(this.options.sourceType == "json")
                return this._populateFromJson();

            if (this.options.sourceType == "array") {

                for (var j = 0; j < this.options.columnData.length; j++) {
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
            else if(this.options.sourceType === "json"){

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

    function appendStyle(element, style){
        var existingStyle = element.attr('style');
        if(existingStyle === undefined){
            existingStyle = "";
        }
        if(existingStyle.length > 0 && existingStyle.charAt(existingStyle.length) !== ";")
            existingStyle += ";";
        
        existingStyle += style;
        element.attr('style', existingStyle);
    };
    
})(jQuery);
