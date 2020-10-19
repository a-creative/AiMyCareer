const API_BASE_ADDRESS = 'http://localhost:5002/api';
export default class Api {

    static put( uri, form_data ) {
        form_data.append('_method','PUT');
        return this.post( uri, form_data );

    }

    static post(uri, form_data ) {
        return fetch(uri, {
            method: 'post',
            body: form_data
        });
    }

    static delete(uri){
        return fetch(uri, {
            method: 'delete',
        });
    }

    static get(uri){
        return fetch(uri, {
            method: 'get'
        });
    }

    static appendFormData( form_data, key, value ) {
        if ( value ) {
            form_data.append(key, value);
        }
        return form_data;
    }

    static assignPostingToFormData( posting ) {
        var form_data = new FormData();
    
        form_data = this.appendFormData(form_data, 'job_title', posting.job_title);
        form_data = this.appendFormData(form_data, 'employer', posting.employer);
        form_data = this.appendFormData(form_data, 'ext_link', posting.ext_link);
        form_data = this.appendFormData(form_data, 'posted_date', posting.posted_date);
        form_data = this.appendFormData(form_data, 'deadline_date', posting.deadline_date);
        form_data = this.appendFormData(form_data, 'location_city', posting.location_city);
        form_data = this.appendFormData(form_data, 'location_postal_code', posting.location_postal_code);
        form_data = this.appendFormData(form_data, 'contact_name', posting.contact_name);
        form_data = this.appendFormData(form_data, 'contact_job_title', posting.contact_job_title);
        form_data = this.appendFormData(form_data, 'contact_details', posting.contact_details);
        form_data = this.appendFormData(form_data, 'content_raw', posting.content_raw);
        
        return form_data;

    }

    static getPostings() {
        return this.get( API_BASE_ADDRESS + "/job_postings" )
    }

    static insertPosting( posting ) {
        return this.post( API_BASE_ADDRESS + "/job_postings", this.assignPostingToFormData( posting ) )
    }

    static updatePosting( posting ) {
        return this.put( API_BASE_ADDRESS + "/job_postings/" + posting.id, this.assignPostingToFormData( posting ) )
    }

    static deletePosting( posting ) {
        return this.delete( API_BASE_ADDRESS + "/job_postings/" + posting.id );
    }

    
}