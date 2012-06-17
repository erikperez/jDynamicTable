(function($, undefined) {
    var me = null;
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
            height:"200px",
            callbacks: {
                sort: function(){},


            },
            icon: "ui-icon-plus",
            

        },
        _create: function() {
            // creation code for mywidget
            // can use this.options
            me = this.element;

            if (this.options.hidden) {
                me.hide();
            }

            //Add main styles
            appendStyle(me, "height:"+this.options.height);
            appendStyle(me, "width:"+this.options.width);

            //build elements
            this._createStructure();
            this._sort(function(){console.log("omg2")});

        },
        _createStructure: function() {
            // internal functions should be named with a leading underscore
            // manipulate the widget
            var $outerDiv = $("<div />");
            $outerDiv.addClass('outerDiv');

            
            $topDiv = $("<div />");
            $topDiv.attr("id", "caption");
            $topDiv.addClass("ui-accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-corner-top");
            
            var $leftTopSpan = $("<span />");

            var $h3 = $("<div />");

            $leftTopSpan.addClass("icon-span ui-icon ui-icon-plus");
            $leftTopSpan.hover(function(){
                var h = $(this);
                if(h.hasClass("ui-state-hover"))
                {
                    h.removeClass("ui-state-hover");
                    return;
                }
                h.addClass("ui-state-hover");
            });

            
            $h3.text(this.options.caption);
            $topDiv.append($leftTopSpan);
            $topDiv.append($h3);
   
            $outerDiv.append($topDiv);      

            var $table = $("<table />");
            $table.addClass("fullsize");
            $table.attr('id', 'myTable');
            $table.attr('cellspacing', 0);
            
            $tableHeader = this._createHeader();
            $tableBody = this._createBody();
            $table.append($tableHeader);
            $table.append($tableBody);
            
            $outerDiv.append($table);
            me.append($outerDiv); 

            $leftTopSpan.click(function(){
                $("table.fullsize").toggle("blind");
            });

        },
        _createHeader: function() {
            var $tableHeader = $("<thead />");
            var $tableRow = $("<tr />");

            for (var column in this.options.columns) 
                $tableRow.append($("<th />").text(column));
          
            $tableHeader.append($tableRow);

            return $tableHeader;
        }

        ,
        _createBody: function() {
            var $tableBody = $("<tbody />");

            if(this.options.sourceType === "json")
                return this._populateFromJson();

            if (this.options.sourceType == "array") {

                for (var j = 0; j < this.options.columnData.length; j++) {
                    var $tableRow = $("<tr />");
                        j % 2 == 2 ? $tableRow.addClass("odd") : $tableRow.addClass("even");
                    for (var i = 0; i < this.options.columnData[j].length; i++){                        
                        $tableRow.append($("<td />").text(this.options.columnData[j][i]));
                     }
                   $tableBody.append($tableRow);
                }

                return $tableBody;
            }
            else if(this.options.sourceType === "json"){

                if(this.options.sourceUrl !== '')
                {

                }
            }
        }
        ,
        _populateFromJson: function(){
            if(sourceType !== me.options.sourceType)
                return;

           $.ajax({
                  url: "test.html",
                  context: document.body
                }).done(function() { 
                  $(this).addClass("done");
                });
          },
        _sort : function(x){
            x();
        }
    
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
