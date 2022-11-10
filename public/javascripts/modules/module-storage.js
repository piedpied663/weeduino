export { WdStorage }
const WDUI = 'WDUI';

class WdStorage {
    constructor() {
        this.Data = this.GetData();
    }
    
    GetData() { return JSON.parse(localStorage.getItem(WDUI)); }

    Save(value) {
        localStorage.setItem(WDUI, JSON.stringify(value));
    }
    Exist() {
        if (this.Data == null) {
            return false;
        } else {
            return true;
        }
    }
    Reset()
    {
        localStorage.removeItem(WDUI);
    }
    CanSave(name, dict) {
        let canSave = true;

        dict.forEach(function (el) {
            if (el == name) {
                canSave = false;
            }
        });
        return canSave
    }
    Save_Custom_Options(name) {
        let options = this.GetData().Custom_Options.options;
        if (this.CanSave(name, options)) {
            let size = options.length;
            options.splice(size, 0, name);
            this.Data.Custom_Options.options = options;
            this.Save(this.Data);
        }
    }

    Get_Default_Options() {
        return this.Data.Default_Options;
    }
    Get_Custom_Options(key) {
        return this.Data.Custom_Options;
    }
    Get_CurrentProfile(key) {
        return this.Data.CurrentProfile;
    }
    Get_Profils(key) {
        return this.Data.Profils;
    }
    Get_Saved() {
        return this.Data.Saved;
    }
}

// let storage = new WdStorage();