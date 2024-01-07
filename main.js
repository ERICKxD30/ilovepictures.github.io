import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getDocs, collection, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { auth, db } from "./app/firebase.js";
import { loginCheck, rolCheck } from "./app/loginCheck.js";
import { setupPosts, postList } from "./app/postList.js";
import { savePost, deletePost, updatePost, getPost, getAdmin } from "./app/firebase.js";
import { notify } from "./app/showMessage.js";

import './app/signupForm.js'
import './app/signinForm.js'
import './app/googleLogin.js'
import './app/facebookLogin.js'
import './app/githubLogin.js'
import './app/logout.js'
import './app/postList.js'


// Función para verificar si la colección existe
const doesCollectionExist = async (collectionPath) => {
  const querySnapshot = await getDocs(collection(db, collectionPath));
  return !querySnapshot.empty;
};

/* Variables auxiliares para editar */
let editStatus = false;
let id = "";

// Función Auth en constante escucha
onAuthStateChanged(auth, async (user) => {
  if (user) {

    loginCheck(user);    
    const collectionPath = "posts"; 
    try {
      const collectionExists = await doesCollectionExist(collectionPath);      

      if (collectionExists) {

        const querySnapshot = await getDocs(
          query(collection(db, collectionPath), orderBy("datetime", "desc"))
        );
        
        /* Consulta de los posts */
        setupPosts(querySnapshot.docs);

        const uniqueId = user.uid;
        console.log(uniqueId);

        const docAdmin = await getAdmin(uniqueId);
        //console.log(docAdmin.data());
        rolCheck(docAdmin.data());
        
        const btnsDelete = postList.querySelectorAll(".btn-delete");
        const btnsEdit = postList.querySelectorAll(".btn-edit");

        /* Eliminar */
        btnsDelete.forEach((btn) =>
          btn.addEventListener("click", ({ target: { dataset } }) => {
            try {
              deletePost(dataset.id);
              notify("Eliminación Exitosa", "La imagen se ha eliminado de firebase correctamente", "success");
            } catch (error) {
              console.log(error);
            }
          })
        );
        
        /* Editar */
        btnsEdit.forEach((btn) =>
          btn.addEventListener("click", async (e) => {
             try {
              const doc = await getPost(e.target.dataset.id);
              const post = doc.data();
              
              postForm["post-url"].value = post.url;
              postForm["post-title"].value = post.title;
              postForm["post-content"].value = post.content;
              
              editStatus = true;
              id = doc.id;
              postForm["btn-send"].innerText = "Guardar Cambios";
              
            } catch (error) {
              console.log(error);
            } 
          })
        );

      } else {
        console.log(`La colección "${collectionPath}" no existe.`);
        postList.innerHTML = '<h4 class="text-white">Parece que no existen posts aún, pulica uno para que los demás puedan verlo :)</h4>';
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    setupPosts([]);
    loginCheck(user);
  }
});

const postForm = document.getElementById('post-form');
const postModal = document.querySelector("#post-form");

/* Subir o Editar */
postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = postForm["post-title"];
  const content = postForm["post-content"];
  const url = postForm["post-url"];
  const datetime = serverTimestamp();

  const modal = bootstrap.Modal.getInstance(postModal.closest('.modal'));

  try {
    if (!editStatus) {
      savePost(title.value, content.value, url.value, datetime);
      postForm.reset();
      modal.hide();
      notify("Subida exitosa", "Se subió la imagen a firebase", "success");
    } else {
      updatePost(id, {
        title: title.value, 
        content: content.value, 
        url: url.value, 
        datetime: datetime
      });
      postForm.reset();
      modal.hide();
      notify("Subida exitosa", "Se editó la imagen de forma correcta", "success");

      editStatus = false;
      id = "";
      postForm["btn-send"].innerText = "Publicar";
    }
  } catch (error) {
    console.log(error);
  }
});

console.log(auth);