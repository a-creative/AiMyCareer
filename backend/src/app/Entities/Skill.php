<?php

namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;

const TOOL_SKILL_TYPE = 0;
const PERSONAL_INTERNAL_SKILL_TYPE = 1;
const PERSONAL_EXTERNAL_SKILL_TYPE = 2;
const LANGUAGE_SKILL_TYPE = 3;
const OTHER_SKILL_TYPE = 4;
const VALID_SKILL_TYPES = [ 0,1,2,3,4 ];
class Skill implements Arrayable
{
    protected $id;
    protected $name;
    protected $explainer;
    protected $type;
    protected $category;
    protected $ownerUser;

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $propName => $propDefaultValue ) {
            $output[ $propName ] = $this->{$propName};
        }

        return $output;

    }

    /**
     * Get the value of type
     */ 
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set the value of type
     *
     * @return  self
     */ 
    public function setType( $type )
    {
        if ( !in_array( $type, VALID_SKILL_TYPES ) ) {
            throw new \TypeError( 'Skill type ' . $this->type . ' is not valid. Valid types are id: ' . implode(', ' , VALID_SKILL_TYPES ) );
        }

        $this->type = $type;

        return $this;
    }
}