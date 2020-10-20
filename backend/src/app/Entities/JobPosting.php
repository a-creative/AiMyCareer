<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;
use Illuminate\Contracts\Support\Arrayable;

/**
 * @ORM\Entity
 * @ORM\Table(name="job_postings",
 *  uniqueConstraints={
 *      @ORM\UniqueConstraint(name="employer_jobtitle_idx",
 *          columns={"employer", "job_title"})
 *      }
 * )
 */
class JobPosting implements Arrayable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string",length=150, nullable=true)
     */
    protected $job_title;

    /**
     * @ORM\Column(type="string",length=150, nullable=true)
     */
    protected $employer;

    /**
     * @ORM\Column(type="string", length=500, nullable=true)
     */
    protected $ext_link;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $created_time;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $updated_time;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    protected $posted_date;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    protected $deadline_date;

    /**
     * @ORM\Column(type="string",length=10, nullable=true)
     */
    protected $location_postal_code;

    /**
     * @ORM\Column(type="string",length=150, nullable=true)
     */
    protected $location_city;

    /**
     * @ORM\Column(type="string",length=150, nullable=true)
     */
    protected $contact_name;

    /**
     * @ORM\Column(type="string",length=150, nullable=true)
     */
    protected $contact_job_title;

    /**
     * @ORM\Column(type="string",length=500, nullable=true)
     */
    protected $contact_details;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $content_raw;

    public function getJobTitle()
    {
        return $this->job_title;
    }

    public function getEmployer()
    {
        return $this->employer;
    }

    public function getExtLink()
    {
        return $this->ext_link;
    }

    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of created_time.
     */
    public function getCreatedTime()
    {
        return $this->created_time;
    }

    /**
     * Set the value of created_time.
     *
     * @param mixed $created_time
     *
     * @return self
     */
    public function setCreatedTime($created_time)
    {
        $this->created_time = $created_time;

        return $this;
    }

    /**
     * Get the value of updated_time.
     */
    public function getUpdatedTime()
    {
        return $this->updated_time;
    }

    /**
     * Set the value of updated_time.
     *
     * @param mixed $updated_time
     *
     * @return self
     */
    public function setUpdatedTime($updated_time)
    {
        $this->updated_time = $updated_time;

        return $this;
    }

    /**
     * Get the value of posted_date.
     */
    public function getPostedDate()
    {
        return $this->posted_date;
    }

    /**
     * Set the value of posted_date.
     *
     * @param mixed $posted_date
     *
     * @return self
     */
    public function setPostedDate($posted_date)
    {
        $this->posted_date = $posted_date;

        return $this;
    }

    /**
     * Get the value of deadline_date.
     */
    public function getDeadlineDate()
    {
        return $this->deadline_date;
    }

    /**
     * Set the value of deadline_date.
     *
     * @param mixed $deadline_date
     *
     * @return self
     */
    public function setDeadlineDate($deadline_date)
    {
        $this->deadline_date = $deadline_date;

        return $this;
    }

    /**
     * Get the value of location_postal_code.
     */
    public function getLocationPostalCode()
    {
        return $this->location_postal_code;
    }

    /**
     * Set the value of location_postal_code.
     *
     * @param mixed $location_postal_code
     *
     * @return self
     */
    public function setLocationPostalCode($location_postal_code)
    {
        $this->location_postal_code = $location_postal_code;

        return $this;
    }

    /**
     * Get the value of contact_name.
     */
    public function getContactName()
    {
        return $this->contact_name;
    }

    /**
     * Set the value of contact_name.
     *
     * @param mixed $contact_name
     *
     * @return self
     */
    public function setContactName($contact_name)
    {
        $this->contact_name = $contact_name;

        return $this;
    }

    /**
     * Get the value of contact_job_title.
     */
    public function getContactJobTitle()
    {
        return $this->contact_job_title;
    }

    /**
     * Set the value of contact_job_title.
     *
     * @param mixed $contact_job_title
     *
     * @return self
     */
    public function setContactJobTitle($contact_job_title)
    {
        $this->contact_job_title = $contact_job_title;

        return $this;
    }

    /**
     * Get the value of contact_details.
     */
    public function getContactDetails()
    {
        return $this->contact_details;
    }

    /**
     * Set the value of contact_details.
     *
     * @param mixed $contact_details
     *
     * @return self
     */
    public function setContactDetails($contact_details)
    {
        $this->contact_details = $contact_details;

        return $this;
    }

    /**
     * Get the value of content_raw.
     */
    public function getContentRaw()
    {
        return $this->content_raw;
    }

    /**
     * Set the value of content_raw.
     *
     * @param mixed $content_raw
     *
     * @return self
     */
    public function setContentRaw($content_raw)
    {
        $this->content_raw = $content_raw;

        return $this;
    }

    /**
     * Get the value of location_city
     */ 
    public function getLocationCity()
    {
        return $this->location_city;
    }

    /**
     * Set the value of location_city
     *
     * @return  self
     */ 
    public function setLocationCity($location_city)
    {
        $this->location_city = $location_city;

        return $this;
    }

    /**
     * Set the value of job_title
     *
     * @return  self
     */ 
    public function setJobTitle($job_title)
    {
        $this->job_title = $job_title;

        return $this;
    }

    /**
     * Set the value of employer
     *
     * @return  self
     */ 
    public function setEmployer($employer)
    {
        $this->employer = $employer;

        return $this;
    }

    /**
     * Set the value of ext_link
     *
     * @return  self
     */ 
    public function setExtLink($ext_link)
    {
        $this->ext_link = $ext_link;

        return $this;
    }

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $prop_name => $prop_default_value ) {
            $output[ $prop_name ] = $this->{$prop_name};
        }

        return $output;

    }
}
