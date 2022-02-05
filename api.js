class Api{

    api = (path,method="GET",body=null)=>{
        let url = path;
        const options = {
            method,
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            }
        };
        if (body != null) {
            options.body = JSON.stringify(body);
        }
        return fetch(url, options);
    }


    makeSlots =async (serv,d1,d2,per,pauza) => {
        let path = "http://localhost:8080/api/v1/booking/mkday/"+serv+"/"+d1+"/"+d2+"/"+per+"/"+pauza;
              
        try {
            let response = await this.api(path, "POST");
            return response.json();
        }catch (e) {
            throw new Error(e);
        }
    }

    getSlotsDay = async (day,serv) => {
        let path = "http://localhost:8080/api/v1/booking/" + day + "/" + serv;
        try {
            
            let response = await this.api(path, "GET");

            return response.json();
        } catch (e) {
            throw new Error(e);
        }
    }

    updateProgramare = async (book) => {
        
        let path = "http://localhost:8080/api/v1/booking/upd/" + book.id;
        try {
            let response=await this.api(path, "PUT", book);
            return response;   
        } catch (e) {
            throw new Error(e);
        }
        
    }
}

export { Api };
