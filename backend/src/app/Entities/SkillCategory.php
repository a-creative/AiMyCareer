<?php

namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;

class SkillCategory implements Arrayable
{
    protected $id;
    protected $name;
    protected $icon;
    protected $foregroundColorHex;
    protected $backgroundColorHex;
    protected $usedInSkills;
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

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
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
     * Get the value of icon
     */ 
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * Set the value of icon
     *
     * @return  self
     */ 
    public function setIcon($icon)
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * Get the value of foregroundColorHex
     */ 
    public function getForegroundColorHex()
    {
        return $this->foregroundColorHex;
    }

    /**
     * Set the value of foregroundColorHex
     *
     * @return  self
     */ 
    public function setForegroundColorHex($foregroundColorHex)
    {
        $this->foregroundColorHex = $foregroundColorHex;

        return $this;
    }

    /**
     * Get the value of backgroundColorHex
     */ 
    public function getBackgroundColorHex()
    {
        return $this->backgroundColorHex;
    }

    /**
     * Set the value of backgroundColorHex
     *
     * @return  self
     */ 
    public function setBackgroundColorHex($backgroundColorHex)
    {
        $this->backgroundColorHex = $backgroundColorHex;

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
}