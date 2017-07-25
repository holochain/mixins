/**
READ THE WIKI ON ANCHORS FOR MORE INFO
https://github.com/Holochain/mixins/wiki/Anchors
***/
function genesis() {
//  addAnchor();
  return true;
}
// USED TO ADD THE MAIN ANCHOR TO THE DHT SO THAT WE CAN USE IT TO  HANG OTHER ANCHORS OFF
function addAnchor()
{
  var dna = App.DNA.Hash;
  var anchor_main = {Anchor_Type:"Anchor_Type",Anchor_Text:""};
  var anchor_main_hash=commit("anchor",anchor_main);
  commit("anchor_links", {Links:[{Base:dna,Link:anchor_main_hash,Tag:"AnchorLink_to_DNA"}]});
  debug("Anchor_links to DNA: "+JSON.stringify(getLink(dna,"AnchorLink_to_DNA",{Load:true})));
  r=  getLink(dna,"AnchorLink_to_DNA",{Load:true});
  return r.Links[0].H ;
}

//USED TO CREATE A NEW Anchor_Type
function anchor_type_create(anchor_type)
{
  var anchor_main_hash=getMainAchorHash();
  var new_anchorType= {Anchor_Type:anchor_type,Anchor_Text:""};
  var key=commit("anchor",new_anchorType);
  commit("anchor_links",{Links:[{Base:anchor_main_hash,Link:key,Tag:"Anchor_Type"}]});
  debug("anchor_type_create: "+JSON.stringify(getLink(anchor_main_hash,"Anchor_Type",{Load:true})));
  r=  getLink(anchor_main_hash,"Anchor_Type",{Load:true});
  return r.Links[0].H ;

}

//USED TO CREATE A NEW ANCHOR OF A PERTICULAR Anchor_Type
//FORMAT FOR VARIABLE {Anchor_Type:"anchor_type",Anchor_Text:"new_anchor"}
function anchor_create(new_anchor){
  var anchor_type=new_anchor.Anchor_Type;
  var anchor_text=new_anchor.Anchor_Text;
  var new_anchor = {Anchor_Type:anchor_type,Anchor_Text:anchor_text};
  var new_anchorHash=commit("anchor",new_anchor);
  var anchorTypeHash = getAnchorTypeHash(anchor_type);
  debug("anchorTypeHash = "+anchorTypeHash)
  anchor_link(anchorTypeHash,new_anchorHash);

  var lnk = getLink(anchorTypeHash,"Anchor_Text",{Load:true});
  debug("anchor_create="+JSON.stringify(lnk.Links[0]))
  return lnk.Links[0].H;
}

function anchor_link(anchor_type,anchor_text){
  commit("anchor_links",{Links:[{Base:anchor_type,Link:anchor_text,Tag:"Anchor_Text"}]});
//  var pass=getLink(anchor_type,"Anchor_Text",{Load:true});
//  debug("Anchor_Text: "+JSON.stringify(getLink(anchor_type,"Anchor_Text",{Load:true})));
//  return pass.Links[0].H;;
}


//USED FOR RETRIVING ALL THE ANCHOR_TYPES THAT ARE HOOKED ON THE MAIN ANCHOR
// List all the anchor types linked to from "AnchorType" created in genesis
function anchor_type_list()
{
  var anchor_type_list=[];
  a=getMainAchorHash();
  debug("anchor_main_hash:"+a);
  var anchor_type=doGetLinkLoad(a,"Anchor_Type");
  for(var j=0;j<anchor_type.length;j++){
   anchor_type_list[j]=anchor_type[j].Anchor_Type

  }
  debug("anchor_type_list:"+anchor_type_list)
return anchor_type_list;
}


//USED FOR RETRIVING ALL THE ANCHOR_Text THAT ARE HOOKED ON a Anchor
// List all the anchor linked to from "AnchorType" created in genesis
function anchor_text_list(anchor_type)
{
  var anchor_text_list=[];
  //anchor_type={Anchor_Type:anchor_type,Anchor_Text:""},
  var anchorTypeHash = getAnchorTypeHash(anchor_type);
  var Anchor_text = doGetLinkLoad(anchorTypeHash,"Anchor_Text");

  for(var j=0;j<Anchor_text.length;j++){
   anchor_text_list[j]=Anchor_text[j].Anchor_Text
   debug("KR : "+JSON.stringify(Anchor_text[0].Anchor_Text))
  }
  debug("anchor_text_list:"+anchor_text_list)
  return anchor_text_list;
}


//TESTED NOT UPDATING YER
function anchor_update(updateText)
{
  var anchor_type = updateText.anchor_type;
  var old_anchorText = updateText.old_anchorText;
  var new_anchorText = updateText.new_anchorText;
  var oldAnchor={Anchor_Type:anchor_type,Anchor_Text:old_anchorText};
  var oldAnchorHash = makeHash(oldAnchor);

  newAnchor={Anchor_Type:anchor_type,Anchor_Text:new_anchorText};
//  var newAnchorHash = makeHash(newAnchor);
  var anchorTypeHash = getAnchorTypeHash(anchor_type);

  var kr = doGetLinkLoad(anchorTypeHash,"Anchor_Text");
  var n = kr.length - 1;
  debug("N="+n);
if(n>=0){
  oldA=kr[n]
debug("oldAnchor : "+JSON.stringify(oldA))
    var updatedAnchor = update("anchor",newAnchor,oldA.H);
debug(newAnchor+" is "+updatedAnchor);
    anchor_updatelink(anchorTypeHash,oldA,updatedAnchor);
}
/*  var updatedAnchor = update("anchor",newAnchor,oldAnchorHash);
//  debug("Old text : "+updateText.old_anchorText+" Old hash : "+oldAnchorHash);
//  debug("New text : "+updateText.new_anchorText+" New hash : "+newAnchorHash);
//  debug("Anchor text successfully updated ! New anchor hash : "+updatedAnchor);
  debug(newAnchor+" is "+updatedAnchor);
  anchor_updatelink(anchorTypeHash,oldAnchorHash,newAnchorHash);
*/
  var updcheck = getLink(anchorTypeHash,"Anchor_Text",{Load:true});
  return updcheck.Links[0].H;
}

function anchor_updatelink(anchorTypeHash,oldAnchorHash,newAnchorHash)
{

  commit("anchor_links",
         {Links:[
             {Base:anchorTypeHash,Link:oldAnchorHash,Tag:"Anchor_Text",LinkAction:HC.LinkAction.Del},
             {Base:anchorTypeHash,Link:newAnchorHash,Tag:"Anchor_Text"}
         ]});
         debug("Linked : "+JSON.stringify(getLink(anchorTypeHash,"Anchor_Text",{Load:true})));

}


/*************
HELPER METHORDS
**************/
//USED TO GET THE MAIN ANCHOR THAT EVERYTING WILL HANG ON
function getMainAchorHash(){
   var anchorMain = {Anchor_Type:"Anchor_Type",Anchor_Text:""};
  //var anchor_main_hash=commit("anchor",anchorMain);
  var anchor_main_hash=makeHash(anchorMain);
  return anchor_main_hash;
}

function getAnchorTypeHash(anchor_type)
{
  var anchorType = {Anchor_Type:anchor_type,Anchor_Text:""};
  var anchorTypeHash =makeHash(anchorType);
  return anchorTypeHash;
}

//  helper function to do getLink call,
//  handle the no-link error case, and copy the returned entry values into a nicer array
function doGetLinkLoad(base,tag) {
    // get the tag from the base in the DHT
    var links = getLink(base,tag,{Load:true});
    debug("links: "+links);
    if (isErr(links)) {
      debug("isErr");
        links = [];
    } else {
      debug("Else []");
        links = links.Links;
    }
    var links_filled = [];
    for (var i=0;i <links.length;i++) {
        var link = {H:links[i].H};
        link[tag] = links[i].E;
        links_filled.push(link);
    }
    debug("Links Filled:"+JSON.stringify(links_filled));
    return links_filled;
}
// helper function to determine if value returned from holochain function is an error
function isErr(result) {
    return ((typeof result === 'object') && result.name == "HolochainError");
}


/*************
VALIDATION METHORDS
**************/
function validatePut(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
function validate(entry_type,entry,header,sources) {
  if (entry_type == "anchor_links"||entry_type == "anchor") {
      return true;
    }
    return true
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){
if(linkingEntryType=="anchor_links")
return true;
return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return false;}
function validateDel(entry_type,hash,pkg,sources) {return false;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
