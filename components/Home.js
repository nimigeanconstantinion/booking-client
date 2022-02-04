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
    this.api = new Api();
    this.init();
    this.main.addEventListener("click", this.clkMain);
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
    this.sloturi = await this.loadSlotsZi(this.d1, this.serv);
    let bookArea = document.querySelector("#book");
      let content = ``;
      
  };
  mkCard = (book) => {
    let card = document.createElement("div");
    card.className = "card";
    let t1h = book.data1.getHours();
    let t1m = book.data1.getMinutes();
    let c = book.client;
    let obs = book.obs;
    card.innerHTML = `
        <p>Slot nr: ${++cnt}</p>
        <div id="interval">
            <input type="time" name="" id="dstart" readonly value="${t1h}:${t1m}:00">
            <input type="time" name="" id="dfin" readonly value="${t2h}:${t2m}:00">
        </div>
        <label for="dclient">Name</label>
        <input type="text" name="dclient" id="dclient" value="${c}">
        <label for="dobst">Obs</label>
        <textarea name="" id="dobs" cols="30" rows="3" value="${obs}"></textarea>
   
        
        `;
    return card;
  };

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

  clkMain = (e) => {
    //e.preventDefault();
    let elem = e.target;
    console.log(elem);
    if (elem.id == "mks") {
      this.initTopMain("makeslots");
    }

    if (elem.id == "gs") {
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
          this.loadSlotsZi(this.d1, this.serv);
          console.log(this.sloturi);
              
    }
  };
}
export { Home };
