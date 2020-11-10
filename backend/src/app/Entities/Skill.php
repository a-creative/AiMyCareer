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
    protected $fixedCase;
    protected $category;
    protected $ownerUser;
    protected $createdTime;
    protected $updatedTime;

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

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of explainer
     */ 
    public function getExplainer()
    {
        return $this->explainer;
    }

    /**
     * Set the value of explainer
     *
     * @return  self
     */ 
    public function setExplainer($explainer)
    {
        $this->explainer = $explainer;

        return $this;
    }

    /**
     * Get the value of category
     */ 
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set the value of category
     *
     * @return  self
     */ 
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get the value of ownerUser
     */ 
    public function getOwnerUser()
    {
        return $this->ownerUser;
    }

    /**
     * Set the value of ownerUser
     *
     * @return  self
     */ 
    public function setOwnerUser($ownerUser)
    {
        $this->ownerUser = $ownerUser;

        return $this;
    }

    /**
     * Get the value of createdTime
     */ 
    public function getCreatedTime()
    {
        return $this->createdTime;
    }

    /**
     * Set the value of createdTime
     *
     * @return  self
     */ 
    public function setCreatedTime($createdTime)
    {
        $this->createdTime = $createdTime;

        return $this;
    }

    /**
     * Get the value of updatedTime
     */ 
    public function getUpdatedTime()
    {
        return $this->updatedTime;
    }

    /**
     * Set the value of updatedTime
     *
     * @return  self
     */ 
    public function setUpdatedTime($updatedTime)
    {
        $this->updatedTime = $updatedTime;

        return $this;
    }
}