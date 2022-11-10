export { ui }
import { WdStorage } from '/static/js/wd/module-storage.js'

const DEFOPS = "DEFAULTOPTS";
const CUSTOPS = "CUSTOMOPS";
const SETTINGSMCU = "SETTINGS";
const WDUI = 'WDUI';
const DEFAULT_OPTIONS = ["Germination", "Croissance", "Floraison"];
let storage = new WdStorage();

class Default_Setting_Mcu {
    constructor() {
        this.key = SETTINGSMCU;
        this.value = [
            { temp: { min: "27", max: "28" } },
            { hum: { min: "40", max: "67" } },
            { fan: { min: "50", max: "30" } },
            { light: { timeofday: "12", speedofday: "100" } }
        ]
    }
}
class CurrentProfil {
    constructor(key="-1",value="null") {
        this.key = key;
        this.value = value;
    }
}
class Default_Options {

    constructor() {
        this.key = DEFOPS;
        this.value = DEFAULT_OPTIONS;
    }
}
class Custom_Options {
    constructor(key) {
        this.key = CUSTOPS;
        this.value = [];
    }

}
class UserProfile {
    constructor(key, value) {
        this.key = key;
        this.value = new Default_Setting_Mcu();
    }
}
let p = [];
class Profils {
    constructor() {

        DEFAULT_OPTIONS.forEach(function (key, value) {
            let np = new UserProfile();
            np.key = key;
            p.splice(key, 0, np);
        })

        this.Profils = p;
    };
}
class WdUi {
    constructor() {
        if(storage.GetData() == null)
        {
            console.log('cas 1');
            this.Default_Options = new Default_Options();
            this.Custom_Options = new Custom_Options();
            this.CurrentProfile = new CurrentProfil();
            this.Profils = new Profils();
        }else{
            console.log('cas 2')            
            this.Default_Options = storage.GetData().Default_Options;
            this.Custom_Options = storage.GetData().Custom_Options;
            this.CurrentProfile = storage.GetData().CurrentProfile;
            this.Profils = storage.GetData().Profils;
        }
        // this.Saved = null;
        storage.Save(this);
        console.log('Ui Ready !');
        
    }
    Init() {

        if(!storage.Exist())
        {
            console.log('Initialization Ui');
            storage.Save(this);
            console.log('Ui Ready !');
        }else{
            console.log('Ui Ready !');
        }
    }
    
    OnChangeCurrentProfile(key, value) {
        this.CurrentProfile = new CurrentProfil(key,value);
        this.Save();
    }
    
    AddCustomOptions(name) {
        if (storage.CanSave(name, storage.GetData().Custom_Options.value)) {
            let size = this.Custom_Options.value.length;
            if (size == 0) {
                this.Custom_Options.value[size] = name;
            } else {
                this.Custom_Options.value[size] = name;
            }

            // let profil = new WdProfile();
            // profil.name = name;
            // profil.keys = this.GetCombineOptionLenght() - 1;
            // profil.Save();
            this.Save();


            return true;
        }
        return false;
    }    
    RemoveCustomOptions(value) {
        if (this.CurrentProfile.value == value) {
            this.CurrentProfile.value = 'null';
            this.CurrentProfile.keys = -1;
        }

        var index = this.Custom_Options.value.indexOf(value);
        if (index > -1) {
            this.Custom_Options.value.splice(index, 1);
        }
        this.Save()
    }
    GetCombineOptionLenght() {
        return (this.GetCustomOptionsLenght() + this.GetDefaultOptionsLenght())
    }
    GetCustomOptionsLenght() {
        return this.Custom_Options.value.length;
    }
    GetDefaultOptionsLenght() {
        return this.Default_Options.value.length;
    }
    ResetApp()
    {
        storage.Reset();
    }
    Save()
    {
        storage.Save(this);
    }
    
}

let ui = new WdUi();