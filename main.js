// "use strict";

// const BASE_URL = "https://lmaweb.minisisinc.com/scripts/mwimain.dll/";
// // const SESSION_ID = global_session_id;
// const SESSION_ID =
//   "https://lmaweb.minisisinc.com/scripts/mwimain.dll/103839252";

// const MAX_NODES_PER_LEVEL = 10;

// /**
//  * ARRAY OF ALL NODES IN THE TREE
//  */

// function NodeArray(array) {
//   this.array = array ? array : [];

//   this.getNode = function(refd) {
//     return this.array.filter(el => el.id === refd)[0];
//   };

//   this.addNode = function(node) {
//     let exist = this.getNode(node.id);
//     if (!exist) {
//       this.array = this.array.concat(node);
//     } else {
//       console.log(node);
//       this.updateNode(node.id, node);
//     }
//   };

//   this.updateNode = function(refd, newNode) {
//     let node = this.array.find(el => el.id === refd);
//     let open = node.state.opened;

//     let index = this.array.indexOf(node);
//     console.log(this.array);
//     this.array.splice(index, 1);
//     console.log(this.array);
//     newNode.state.opened = open;
//     this.array = this.array.concat(newNode);
//     console.log(this.array);
//   };

//   this.openParentsNode = function() {
//     let openNode = this.array[0];
//     let parentNode = this.getNode(openNode.parent);

//     while (openNode.parent !== "#") {
//       parentNode.state.opened = true;
//       openNode = parentNode;
//       parentNode = this.getNode(openNode.parent);
//     }
//   };

//   this.renderTree = function() {
//     $("#tree")
//       .on("changed.jstree", function(e, data) {
//         console.log(data);
//         if (data.action === "select_node") {
//           console.log(data.node);
//         }
//       })
//       .on("open_node.jstree", function(e, data) {
//         console.log(data);
//         // if (data.action === "select_node") {
//         //   console.log(data.node);
//         // }
//       })
//       .jstree({
//         core: {
//           data: this.array
//         }
//       });
//   };
// }

// /**
//  *
//  * @param {*} refd
//  * @param {*} title
//  * @param {*} open
//  * @param {*} parent
//  */
// function Node(refd, title, open, parent, select) {
//   return {
//     id: refd,
//     text: title ? title : refd,
//     state: {
//       opened: open ? open : false,
//       selected: select ? select : false
//     },
//     parent: parent ? parent : "#"
//   };
// }

// function getCurrentRecord() {
//   let hiddenParent = document.querySelector("#parent-link");
//   /**
//    * if hiddenParent exists, it means we are not on the
//    * root of the tree. This function will extract the root
//    * reference code from the innerText which is defined in the
//    * WEB_DETAIL report
//    */
//   let rootRef, rootTitle;
//   if (hiddenParent !== null) {
//     let parentArray = hiddenParent.innerText.split("||").map(function(e) {
//       return e.trim();
//     });

//     rootRef = parentArray[0].split(" - ")[0];
//     rootTitle = parentArray[0].split(" - ")[1];
//     return new Node(rootRef, rootTitle, open, undefined, true);
//   }

//   // rootRef = document.querySelector('#REFD').innerText ;

//   rootRef = "DW-1";
//   //   rootTitle = document.querySelector("#title").innerText;
//   rootTitle = "DW-1-ARCHDEACONRY OF SURREY";

//   rootRef = "DW/CB";
//   //   rootTitle = document.querySelector("#title").innerText;
//   rootTitle = "DW/AB-ARCHDEACONRY OF SURREY";

//   return new Node(rootRef, rootTitle, true, undefined, true);
// }

// function getURL(refd) {
//   refd = encodeRefd(refd);
//   return (
//     SESSION_ID +
//     "/LMA_DESCRIPTION/REFD/" +
//     refd +
//     "/EXTRACT_TREE_PAGE?JUMP&DATABASE=LMA_DESCRIPTION&SHOWSINGLE=Y&SHARE_SESSID=LMA_SHARE_SESSID&M_GVAR1=START_ENTRY:0&M_GVAR2=TREE_FORMAT:XML"
//   );
// }

// function sendAjax(url) {
//   return $.ajax(url);
// }

// function getTree(refd, tree) {
//   let url = getURL(refd);

//   return sendAjax(url).then(function(response) {
//     let json = xmlToJson(response);
//     json.links.link.map(node => {
//       if (node.refd) {
//         console.log(node);
//         node = new Node(node.refd, node.title, false, refd);
//         //   getTree(node.refd, tree);
//       } else if (node["next-page-link"]) {
//         node = new Node("so", "Next 500 records", false, refd);
//       }
//       tree.addNode(node);
//     });

//     if (hasParent(json)) {
//       let refd_higher = json.links.refd_higher;

//       if (!tree.getNode(refd)) {
//         let newNode = new Node(refd, "");
//         tree.addNode(newNode);
//       }
//       tree.getNode(refd).parent = refd_higher;
//       return getTree(refd_higher, tree);
//     }
//     let root = new Node(refd, "", true);
//     tree.addNode(root);

//     return tree;
//   });
// }

// function hasParent(json) {
//   return json.links.refd_higher;
// }

// function main() {
//   let currentNode = getCurrentRecord();

//   let tree = new NodeArray();
//   tree.addNode(currentNode);

//   getTree(currentNode.id, tree).then(function(res) {
//     tree.openParentsNode();
//     tree.renderTree();
//     console.log(tree.array);
//   });
// }

// main();

// // ====== HELPER FUNCTIONS ========

// function encodeRefd(refd) {
//   return refd.replace(/\//g, "~2F");
// }

// function xmlToJson(response) {
//   let xmlText = new XMLSerializer().serializeToString(response);
//   let x2js = new X2JS({
//     arrayAccessFormPaths: ["links.link"]
//   });
//   var json = x2js.xml_str2json(xmlText);
//   return json;
// }

// function Parent(array) {

//   this.array = array ? array : [];

//   this.addChild = function(child) {
//     this.array.push(child)
//   }
// }

// function Child(name, parent) {
//   this.name = name ? name : "Default";
//   this.parent = parent
// }

// let parent = new Parent([])
// let jack = new Child('jack', parent);
// let cat = new Child('Meow ', parent);
// let dog = new Child('Shoob', parent);

// parent.addChild(jack)
// parent.addChild(cat)
// parent.addChild(dog)

// console.log(parent.array)

// console.log("\n=========\n")
// console.log(jack.parent)

const SESSION_ID =
  "https://lmaweb.minisisinc.com/scripts/mwimain.dll/184390003";

function Node(refd, tree) {
  this.refd = refd;
  this.tree = tree;
  this.title;
  this.hasChild;

  this.loadedChildren;
  this.open;
  this.parent;
  this.link;
  this.childrenArray;

  this.render = function(link, tree) {
    this.refd = link.refd;
    this.link = link["sub-lower-link"];
    this.title = link.title;
    this.hasChild = link["has-children"] === "true";
    this.tree = tree;

    if (this.hasChild) {
      this.initChildren();
    } else {
      this.hasChild = false;
      this.loadedChildren = true;
      this.childrenArray = false;
    }
  };
  this.setParent = function() {
    this.childrenArray = [];
    this.hasChild = true;
    this.loadedChildren = true;
  };
  this.setRoot = function() {
    this.childrenArray = [];
    this.hasChild = true;
    this.loadedChildren = true;
  };
  this.exportNode = function() {
    if (this.hasChild && this.loadedChildren) {
      this.childrenArray = [];
    }
    if (this.hasChild && !this.loadedChildren) {
      this.childrenArray = true;
    }
    if (!this.hasChild) {
      this.childrenArray = false;
    }

    return {
      id: this.refd,
      text: this.title ? this.title : this.refd,
      state: {
        opened: this.open ? this.open : false
      },
      parent: this.parent ? this.parent : "#",
      children: this.childrenArray
    };
  };

  this.loadChildren = function() {
    this.loadedChildren = true;
    this.hasChild = true;
    this.childrenArray = [];
  };

  this.initChildren = function() {
    this.loadedChildren = false;
    this.hasChild = true;
    this.childrenArray = true;
  };
}

function Tree() {
  this.array = [];
  this.currentNode;

  this.copyNode = function(oldNode, newNode) {
    newNode.hasChild = oldNode.hasChild;
    newNode.loadedChildren = oldNode.loadedChildren;
    newNode.childrenArray = oldNode.childrenArray;
  };

  this.getNode = function(refd) {
    return this.array.filter(function(el) {
      return el.refd === refd;
    })[0];
  };

  this.addNode = function(node) {
    let exist = this.getNode(node.refd);
    if (!exist) {
      this.array = this.array.concat(node);
    } else {
      this.updateNode(node.refd, node);
    }
  };

  this.updateNode = function(refd, newNode) {
    let node = this.array.find(function(el) {
      return (el.refd = refd);
    });
    this.copyNode(node, newNode);
    this.removeNode(refd);
    this.array = this.array.concat(newNode);
  };

  this.removeNode = function(refd) {
    this.array = this.array.filter(function(el) {
      return el.refd !== refd;
    });
  };
  this.getTree = function(refd, tree) {
    let url = tree.getURL(refd);

    return $.ajax(url).then(function(response) {
      let json = xmlToJson(response);

      if (hasChildren(json)) {
        json.links.link.map(function(link) {
          let node = new Node();
          if (link.refd) {
            node.render(link, tree);
            node.parent = refd;
          }

          tree.addNode(node);
        });
      }

      if (hasParent(json)) {
        let parent = json.links.refd_higher;
        tree.getNode(refd).parent = parent;

        let newNode = new Node(parent, tree);
        newNode.setParent();
        tree.addNode(newNode);

        return tree.getTree(parent, tree);
      }

      //   let root = new Node(refd, tree);
      //   root.setParent();
      //   tree.addNode(root);
      tree.renderTree();
    });
  };

  this.renderTree = function() {
    let tree = this;

    $("#tree")
      .on("changed.jstree", function(e, data) {
        if (data.action === "select_node") {
          console.log(tree.getNode(data.node.id));
        }
      })
      .on("open_node.jstree", function(e, data) {
        // if (data.action === "select_node") {
        //   console.log(data.node);
        // }
      })
      .jstree({
        core: {
          data: tree.getNodeArray()
        }
      });
  };
  this.getNodeArray = function() {
    let array = this.array.map(function(node) {
      return node.exportNode();
    });
    return array;
  };
  this.getCurrentRecord = function(refd) {
    this.currentNode = new Node(refd, this);
    this.currentNode.setParent();
    this.addNode(this.currentNode);
  };

  this.encodeRefd = function(refd) {
    return refd.replace(/\//g, "~2F");
  };

  this.getURL = function(refd) {
    return (
      SESSION_ID +
      "/LMA_DESCRIPTION/REFD/" +
      this.encodeRefd(refd) +
      "/EXTRACT_TREE_PAGE?JUMP&DATABASE=LMA_DESCRIPTION&SHOWSINGLE=Y&SHARE_SESSID=LMA_SHARE_SESSID&M_GVAR1=START_ENTRY:0&M_GVAR2=TREE_FORMAT:XML"
    );
  };
}
function xmlToJson(response) {
  let xmlText = new XMLSerializer().serializeToString(response);
  let x2js = new X2JS({
    arrayAccessFormPaths: ["links.link"]
  });
  var json = x2js.xml_str2json(xmlText);
  return json;
}
function hasParent(json) {
  return json.links.refd_higher;
}
function hasChildren(json) {
  return json.links.link;
}

function main() {
  let tree = new Tree();
  let refd = "DW/PA";
  tree.getCurrentRecord(refd);
  tree.getTree(refd, tree).then(function(res) {
    console.log(tree.array);
  });
}

main();
