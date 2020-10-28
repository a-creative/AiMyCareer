<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;
use Illuminate\Contracts\Support\Arrayable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Doctrine\Common\Collections\ArrayCollection;
use JobPosting;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User extends Authenticatable implements Arrayable, JWTSubject
{

    public function __construct() {
        $this->jobPostings = new ArrayCollection();
    }

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(name="email", type="string",length=80, nullable=false)
     */
    protected $email;

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

    /**
     * One user has many job posting. This is the inverse side.
     * @ORM\OneToMany(targetEntity="JobPosting", mappedBy="ownerUser")
     */
    protected $jobPostings;

    public function toArray() {
        $user = [    
            'email' => $this->getEmail(),
            'firstName' => $this->getFirstName(),
            'lastName' => $this->getLastName(),
        ];

        return $user;
    }

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getId();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of email
     */ 
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail($email)
    {
        $this->email = $email;

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

    /**
     * Get one user has many job posting. This is the inverse side.
     */ 
    public function getJobPostings()
    {
        return $this->jobPostings;
    }

    /**
     * Set one user has many job posting. This is the inverse side.
     *
     * @return  self
     */ 
    public function setJobPostings($jobPostings)
    {
        $this->jobPostings = $jobPostings;

        return $this;
    }
}