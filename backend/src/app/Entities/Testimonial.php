<?php

namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;

class Testimonial implements Arrayable
{
    protected $id;
    protected $summaryHtml;
    protected $byName;
    protected $contactPhoneNo;
    protected $contactEmail;
    protected $onLinkedInProfile;
    protected $onPaper;
    
    protected $aboutJobExperience;

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $propName => $propDefaultValue ) {
            $output[ $propName ] = $this->{$propName};
        }

        return $output;

    }
}