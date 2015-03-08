UI = {
  enableErrorLogs: true,
  defaultCanvasDimensionsOptions: { //change option name
    width: 512,
    height: 480,
    jqclass: "canvas-element",
    jqid: "314159", 
  },
  
  get2DContext: function(canvasjq){
    try{
      var me = this;
      return me.getContext(canvasjq, "2d");
    }catch(err){
      if(me.enableErrorLogs) console.log(err);
    }
  },
  
  get3DContext: function(canvasjq){
    try{
      var me = this;
    }catch(err){
      if(me.enableErrorLogs) console.log(err);
    }
  },
  
  getContext: function(canvas, contextType){
    try{
      var me = this;
      return canvas.getContext(contextType);
    }catch(err){
      if(me.enableErrorLogs) console.log(err);
    }
  },
  
  makeCanvas: function(opts){
    try{
      var me = this;
      if(!opts || typeof opts != "object" || $.isEmptyObject(opts)) opts = me.defaultCanvasDimensionsOptions;
      var width = opts.width;
      var height = opts.height;
      var jqclass = opts.jqclass;
      var jqid = opts.jqid;
      var context = opts.context;
      
      var canvasjq = 
        $('<canvas/>')
          .addClass(jqclass)
          .attr('id', jqid)
          // .height(height)
          // .width(width)
      var canvas = canvasjq[0];
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }catch(err){
      if(me.enableErrorLogs)console.log("Error in makeCanvas:" + err)
    }
  },
  
  makeImg: function(jqclass,imgSrc){
    var me = this;
    try{
      return me.makeElement("img",jqclass).attr('src', imgSrc);
    }catch(err){
      if(me.enableErrorLogs) console.log(err);
    }
  },
  
  makeElement: function(elementType, jqclass){
    try{
      var me = this;
      return $('<' + elementType + '/>').addClass(jqclass);
    }catch(err){
      if(me.enableErrorLogs) console.log(err);
    }
  },



}