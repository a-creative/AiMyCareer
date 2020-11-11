import Api from '_shared/Api'

export default class ApiSkillCategory {

    static assignSkillCategoryToFormData( skillCategory ) {
        var formData = new FormData();
    
        formData = Api.appendFormData(formData, 'name', skillCategory.name);
        formData = Api.appendFormData(formData, 'icon', skillCategory.icon);
        formData = Api.appendFormData(formData, 'foregroundColorHex', skillCategory.foregroundColorHex);
        formData = Api.appendFormData(formData, 'backgroundColorHex', skillCategory.backgroundColorHex);
        
        return formData;

    }

    static getSkillCategories( loggedIn ) {
        return Api.get("/auth/skill-categories", undefined, Api.getTokenFrom( loggedIn ))
    }

    static insertSkillCategory( skillCategory, loggedIn ) {
        return Api.post("/auth/skill-categories", this.assignSkillCategoryToFormData( skillCategory ), Api.getTokenFrom( loggedIn ) )
    }

    static updateSkillCategory( skillCategory, loggedIn ) {
        return Api.put("/auth/skill-categories/" + skillCategory.id,this.assignSkillCategoryToFormData( skillCategory ), Api.getTokenFrom( loggedIn )  )
    }

    static deleteSkillCategory( skillCategory, loggedIn ) {
        return Api.delete("/auth/skill-categories/" + skillCategory.id, Api.getTokenFrom( loggedIn ) );
    }
    
}