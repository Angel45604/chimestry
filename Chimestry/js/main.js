var list=true;
var translatedTxt="";
var compoundCounter=0;
$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.materialboxed').materialbox();
  });

function animateCompound(classname, direction){
  console.log(classname);
  if(direction){
    var compounds = anime({
      targets: '.'+classname,
      scale:[0,1],
      easing:'easeInOutExpo',
      duration:500
    });
  }else{
    var compounds = anime({
      targets: '.'+classname,
      scale:[1,0],
      easing:'easeInOutExpo',
      duration:500
    });
  }
}


  //   var Matraz = anime({
  // targets: '#lineDrawing .lines #Matraz  .cls-3',
  // strokeDashoffset: [anime.setDashoffset, 0],
  // easing: 'easeInOutSine',
  // duration: 3500,
  // delay: function(el, i) { return i * 250 },
  // direction: 'alternate',
  // loop: true,
  // });

  //   var fluid = anime({
  //     targets: '#lineDrawing .lines #Matraz #fluid',
  //     opacity:[0,1],
  //     duration: 3500,
  //     easing: 'easeInOutBack',
  //     direction: 'alternate',
  //     loop: true

  //   })

function translateCompound(){
  var com=$("#compound").val();
  $.ajax({cache:false,
    url: "https://translation.googleapis.com/language/translate/v2?key=AIzaSyAVTjIDdVpxk4xW885S7ysm-aVjf1mmT2g&source=ES&target=EN&q="+com,

    success:function(data){
      translatedTxt=data.data.translations[0].translatedText;
      console.log(translatedTxt);
      generateCompound(com,translatedTxt);
    },

    error: function(ajaxContext){
      console.log(ajaxContext);
    }
  })
}

function generateCompound(untranslatedtext,translatedtext){
  var com=translatedtext;
  if(com==""){
    $( "#compound" ).toggleClass( "invalid");
    return
  }
  $.ajax({ cache: false,
    url: "https://cactus.nci.nih.gov/chemical/structure/"+com+"/smiles",

    success: function (data) {
        var x= encodeURIComponent(data);
        //$("#imagenita").attr("src","http://localhost:4200/molecule/"+x);
        insertCompound(untranslatedtext,"http://localhost:4200/molecule/"+x,list);
        document.getElementById("compound").value="";
        list=!list;
    },

    error: function (ajaxContext) {
        if(com.includes('ano')){
          var tmp = com.replace(/ano/g , "ane");
          console.log(tmp);
          generateCompound(com,tmp);
        }else{
          $( "#compound" ).toggleClass( "invalid");
        }
        //alert("Compuesto no soportado");
    }
  }); 
}
function checkCompound(e){
  if(e.keyCode==13){
    translateCompound();
  }
}

function deleteCompound(compoundNum){
  animateCompound("compoundItem"+compoundNum,false);
  //$('.collapsible').collapsible('open', compoundNum);
  setTimeout(function(){
    var compoundElement=document.getElementById("compound"+compoundNum);
    compoundElement.parentNode.removeChild(document.getElementById("compound"+compoundNum));
  }, 500);
}

function animateArrow(item){
  var icon = document.getElementById("icon"+item);
  if(icon.classList.contains('open')){
    icon.classList.remove('open');
    icon.classList.add('closed');
  }else{
    icon.classList.remove('closed');
    icon.classList.add('open');
  }
}

//arrow_drop_up

function insertCompound(componentName,compoundURL, list){
  var container1 = document.getElementById("compoundList1");
  var container2 = document.getElementById("compoundList2");
  if(list){
    container1.innerHTML+="<li class='compoundItem"+compoundCounter+"' id='"+"compound"+compoundCounter+"'>"+
                    "<div class='collapsible-header' onclick='animateArrow("+compoundCounter+")'><div class='left'><i class='material-icons' id='icon"+compoundCounter+"'>arrow_drop_down</i>"+componentName+"</div><div class='right'><a onclick='deleteCompound("+compoundCounter+")'><i class='material-icons'>close</i></a></div></div>"+
                    "<div class='collapsible-body'><img class='materialboxed' data-caption='"+componentName+"' style='display:block;margin:auto;' src="+compoundURL+"></img></div>"+
                "</li>"
                animateCompound("compoundItem"+compoundCounter, true);
                
  }else{
    container2.innerHTML+="<li class='compoundItem"+compoundCounter+"' id='"+"compound"+compoundCounter+"'>"+
                    "<div class='collapsible-header' onclick='animateArrow("+compoundCounter+")'><div class='left'><i class='material-icons' id='icon"+compoundCounter+"'>arrow_drop_down</i>"+componentName+"</div><div class='right'><a onclick='deleteCompound("+compoundCounter+")'><i class='material-icons'>close</i></a></div></div>"+
                    "<div class='collapsible-body'><img class='materialboxed' data-caption='"+componentName+"' style='display:block;margin:auto;' src="+compoundURL+"></img></div>"+
                "</li>"
                animateCompound("compoundItem"+compoundCounter, true);
  }
  compoundCounter++;
  
}

//java -jar target/sourire-0.1.0-SNAPSHOT-standalone.jar :port 4200
