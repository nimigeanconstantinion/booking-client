import { Api } from "../api.js";

class Home {
  constructor() {
    this.main = document.querySelector("main");
    this.cnt = 0;
    this.sloturi = [];
    this.d1 = "";
    this.d2 = "";
    this.per = 0;
    this.pause = 0;
    this.serv = 0;
    this.cnt = 0;
    this.api = new Api();
    this.init();
    this.main.addEventListener("click", this.clkMain);
    this.container = document.querySelector("#book");
    this.container.addEventListener("change", this.changeCard);
  }

  init = () => {
    this.main.innerHTML = ``;
    this.main.innerHTML = `
        <aside class="left">
            <div class="navi">
                <div class="meniux unu">
                    
                    <div class="opt unu">Meniu</div>
        
                    <div class="submeniu1">
                        <div id="mks">Creeaza sloturi programare</div>
                        <div id="gs">Programare</div>
                    </div>
                </div>
            </div>
        </aside>
        <div class="topmain">
        </div>        
        <div id="book">

        </div>
        `;
  };

  loadSlotsZi = async (zi, serv) => {
      try {
        let response= await this.api.getSlotsDay(zi, serv);
        
        return response;
          
      } catch (e){
          throw new Error(e);
    }
  };

  openDay = async (d1, d2, durata, pauza, serv) => {
    await this.api.makeSlots(serv, d1, d2, durata, pauza);
  };

  createBooking = async () => {
    await this.openDay(this.d1, this.d2, this.per, this.pause, this.serv);
      
  }

  showDay =async () => {
    this.sloturi = await this.loadSlotsZi(this.d1, this.serv);
    this.loadBookArea();    
  }

  loadBookArea = () => {
    let dt = new Date(this.d1);
    let bookArea = document.querySelector("#book");
    let content = ``;
    let top = document.querySelector(".topmain");
    let elm = document.createElement("h1");
    let dtt = ('0' + dt.getDate()).slice(-2) + '.' + ('0' + (dt.getMonth() + 1)).slice(-2) + '.'
      + dt.getFullYear();
    elm.textContent = "Lista programare pentru data de "+dtt+" la serviciul " + this.serv.toUpperCase();
    top.appendChild(elm);
    this.sloturi.forEach(e => {
      content += this.mkCard(e);
    })
    bookArea.innerHTML = content;
    let carduri = bookArea.children;
    console.log("avem caduri ="+carduri.length)
    this.sloturi.forEach(e => {
      console.log(e.client.length);
      if (e.client.length > 0) {
        let index = this.sloturi.indexOf(e);
        console.log("index="+index);
        carduri[index].style.backgroundColor = "rgb(231, 161, 161)";
      }    

    });
    

  }

  mkCard = (book) => {
    console.log(book);
    let t1 = new Date(book.data1);
    let t2 = new Date(book.data2);
    
    let tm1 = t1.toTimeString();
    let tm2 = t2.toTimeString();
    
    let c = book.client;
    let obs = book.obs;
    
    let retcard = `
    <div class="card">
        <p class="hid">${book.id}</p>
        <p>Slot nr: ${++this.cnt}</p>
        <div id="interval">
            <input type="time" name="" id="dstart" readonly value=${tm1}>
            <input type="time" name="" id="dfin" readonly value=${tm2}>
        </div>
        <label for="dclient">Name</label>
        <input type="text" name="dclient" id="dclient" value="${c}">
        <label for="dobst">Obs</label>
        <textarea name="" id="dobs" cols="30" rows="2" value="">${book.obs}</textarea>
    </div>
    `;
    return retcard;
  }

  
  initTopMain = (tip) => {
    let top = document.querySelector(".topmain");
    if (tip == "makeslots") {
      top.innerHTML = `
            <div>
                <label>Alegeti ziua pentru sloturi</label>
                <input type="datetime-local" name="data1" id="data1" value="">
                <input type="datetime-local" name="data2" id="data2" value="">
                <label for="durata">Durata medie programari(min)</label>
                <input type="number" id="durata" value=0>
                <label for="paza">Pauza (min)</label>
                <input type="number" id="pauza" value=0>
                <label for="serv">Serviciul</label>
                <select name="" id="selserv">
                    <option value="" hidden >Alegeti serviciul</option>
                    <option value="">Pasapoarte</option>
                    <option value="">Permise</option>
                    <option value="">Carti identitate</option>
                    <option value="">Inmatriculari</option>

                </select>



            </div>
            <button class="btngen">Generare</button>
            
            `;
    }
    if (tip == "getdayserv") {
      top.innerHTML = `
            <div>
                <label>Alegeti ziua si serviciul</label>
                <input type="datetime-local" name="data1" id="data1" value="">
                <label for="serv">Serviciul</label>
                <select name="" id="selserv">
                    <option value="" hidden >Alegeti serviciul</option>
                    <option value="">Pasapoarte</option>
                    <option value="">Permise</option>
                    <option value="">Carti identitate</option>
                    <option value="">Inmatriculari</option>

                </select>



            </div>
            <button class="btnget">Incarca Programari</button>
            
            `;
    }
  };

  updateBook = async (book) => {
    try {
      let response=await this.api.updateProgramare(book);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
  clkMain =async (e) => {
    //e.preventDefault();
    let elem = e.target;
    console.log(elem);
    if (elem.id == "mks") {
      let bookArea = document.querySelector("#book");
      bookArea.innerHTML = ``;
      this.initTopMain("makeslots");
    }

    if (elem.id == "gs") {
      let bookArea = document.querySelector("#book");
      bookArea.innerHTML = ``;
      this.initTopMain("getdayserv");
    }

    if (elem.className == "btngen") {
      e.preventDefault();
      let top = document.querySelector(".topmain");
      this.d1 = document.querySelector("#data1").value;
      this.d2 = document.querySelector("#data2").value;
      this.per = document.querySelector("#durata").value;
      this.pause = document.querySelector("#pauza").value;
      let selectie = document.querySelector("#selserv");
      this.serv = selectie.options[selectie.selectedIndex].textContent;

      top.innerHTML = ``;
      this.createBooking();
    }
    
      if (elem.className == "btnget") {
          e.preventDefault();
          let top = document.querySelector(".topmain");
          this.d1 = document.querySelector("#data1").value;
          let selectie = document.querySelector("#selserv");
          this.serv = selectie.options[selectie.selectedIndex].textContent;
    
          top.innerHTML = ``;
          await this.showDay();
          
              
    }
  };

  changeCard =async (e) => {
    let celm = e.target;
    if (celm.id == "dclient" || celm.id == "dobs") {
      console.log(celm.parentNode);
      let copii = celm.parentNode.children;
      let id = copii[0].textContent;
       
      let book = this.sloturi.filter(a => a.id == id)
      
      book[0].client = copii[4].value;
      book[0].obs = copii[6].value;
      
      console.log(book[0]);
      let response=await this.updateBook(book[0]);
      let top = document.querySelector(".topmain");
      top.innerHTML = ``;
      await this.showDay();
  
    }  
  }
}
export { Home };
