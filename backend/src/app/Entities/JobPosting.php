<?php

namespace App\Entities;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="job_postings",
 *  uniqueConstraints={
 *      @ORM\UniqueConstraint(name="employer_jobtitle_idx",
 *          columns={"employer", "job_title"})
 *      }
 * )
 */
class JobPosting
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
    public function getCreated_time()
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
    public function setCreated_time($created_time)
    {
        $this->created_time = $created_time;

        return $this;
    }

    /**
     * Get the value of updated_time.
     */
    public function getUpdated_time()
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
    public function setUpdated_time($updated_time)
    {
        $this->updated_time = $updated_time;

        return $this;
    }

    /**
     * Get the value of posted_date.
     */
    public function getPosted_date()
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
    public function setPosted_date($posted_date)
    {
        $this->posted_date = $posted_date;

        return $this;
    }

    /**
     * Get the value of deadline_date.
     */
    public function getDeadline_date()
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
    public function setDeadline_date($deadline_date)
    {
        $this->deadline_date = $deadline_date;

        return $this;
    }

    /**
     * Get the value of location_postal_code.
     */
    public function getLocation_postal_code()
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
    public function setLocation_postal_code($location_postal_code)
    {
        $this->location_postal_code = $location_postal_code;

        return $this;
    }

    /**
     * Get the value of contact_name.
     */
    public function getContact_name()
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
    public function setContact_name($contact_name)
    {
        $this->contact_name = $contact_name;

        return $this;
    }

    /**
     * Get the value of contact_job_title.
     */
    public function getContact_job_title()
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
    public function setContact_job_title($contact_job_title)
    {
        $this->contact_job_title = $contact_job_title;

        return $this;
    }

    /**
     * Get the value of contact_details.
     */
    public function getContact_details()
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
    public function setContact_details($contact_details)
    {
        $this->contact_details = $contact_details;

        return $this;
    }

    /**
     * Get the value of content_raw.
     */
    public function getContent_raw()
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
    public function setContent_raw($content_raw)
    {
        $this->content_raw = $content_raw;

        return $this;
    }
}
