<?php

namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use App\Entities\JobPosting;
use App\Entities\JobExperience;
use App\Entities\Education;
use App\Entities\SkillCategory;
use App\Entities\Skill;


class User extends Authenticatable implements Arrayable, JWTSubject
{

    protected $id;
    protected $email;
    protected $password;
    protected $firstName;
    protected $lastName;
    protected $rememberToken;

    /** @var Education [] */
    protected $educations;

    /** @var Skill [] */
    protected $skills;

    /** @var SkillCategory [] */
    protected $skillCategories;

    /**
     * The Job Postings this user has recorded.
     *
     * @var JobPosting [];
     */
    protected $jobPostings;
    
    /**
     * The Job Experiences this user has recorded.
     *
     * @var JobExperience [];
     */
    protected $jobExperiences;

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
     * Get [];
     *
     * @return  JobExperience
     */ 
    public function getJobExperiences()
    {
        return $this->jobExperiences;
    }

    /**
     * Set [];
     *
     * @param  JobExperience  $jobExperiences  [];
     *
     * @return  self
     */ 
    public function setJobExperiences(JobExperience $jobExperiences)
    {
        $this->jobExperiences = $jobExperiences;

        return $this;
    }

    /**
     * Get [];
     *
     * @return  JobPosting
     */ 
    public function getJobPostings()
    {
        return $this->jobPostings;
    }

    /**
     * Set [];
     *
     * @param  JobPosting  $jobPostings  [];
     *
     * @return  self
     */ 
    public function setJobPostings(JobPosting $jobPostings)
    {
        $this->jobPostings = $jobPostings;

        return $this;
    }
}