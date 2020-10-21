<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Facades\Hash;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User implements Arrayable, \Illuminate\Contracts\Auth\Authenticatable
{
    use \LaravelDoctrine\ORM\Auth\Authenticatable;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(name="username", type="string",length=80, nullable=false)
     */
    protected $username;

    /**
     * @ORM\Column(name="password", type="string",length=80, nullable=false)
     */
    protected $password;

    /**
     * @ORM\Column(name="first_name", type="string",length=80, nullable=true)
     */
    protected $firstName;

    /**
     * @ORM\Column(name="last_name", type="string",length=80, nullable=true)
     */
    protected $lastName;

    /**
     * @ORM\Column(name="remember_token", type="string",length=100, nullable=true)
     */
    protected $rememberToken;


    public function toArray() {
        $output = [];

        foreach (get_class_vars(get_class($this)) as $propName => $propDefaultValue) {
            if (in_array($propName, ['password'])) {
                continue;
            }

            $output[$propName] = $this->{$propName};
        }

        return $output;
    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of username
     */ 
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set the value of username
     *
     * @return  self
     */ 
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get the value of password
     */ 
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @return  self
     */ 
    public function setPassword($password)
    {
        $this->password = Hash::make($password);

        return $this;
    }

    public function auth( $password ) {
        return Hash::check( $password, $this->password );
    }
 
    /**
     * Get the value of firstName
     */ 
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set the value of firstName
     *
     * @return  self
     */ 
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get the value of lastName
     */ 
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set the value of lastName
     *
     * @return  self
     */ 
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }
}