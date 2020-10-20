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
     * @ORM\Column(name="job_title", type="string",length=150, nullable=true)
     */
    protected $jobTitle;

    /**
     * @ORM\Column(type="string",length=150, nullable=true)
     */
    protected $employer;

    /**
     * @ORM\Column(name="ext_link", type="string", length=500, nullable=true)
     */
    protected $extLink;

    /**
     * @ORM\Column(name="created_time", type="datetime", nullable=true)
     */
    protected $createdTime;

    /**
     * @ORM\Column(name="updated_time", type="datetime", nullable=true)
     */
    protected $updatedTime;

    /**
     * @ORM\Column(name="posted_date", type="date", nullable=true)
     */
    protected $postedDate;

    /**
     * @ORM\Column(name="deadline_date", type="date", nullable=true)
     */
    protected $deadlineDate;

    /**
     * @ORM\Column(name="location_postal_code", type="string",length=10, nullable=true)
     */
    protected $locationPostalCode;

    /**
     * @ORM\Column(name="location_city", type="string",length=150, nullable=true)
     */
    protected $locationCity;

    /**
     * @ORM\Column(name="contact_name", type="string",length=150, nullable=true)
     */
    protected $contactName;

    /**
     * @ORM\Column(name="contact_job_title", type="string",length=150, nullable=true)
     */
    protected $contactJobTitle;

    /**
     * @ORM\Column(name="contact_details", type="string",length=500, nullable=true)
     */
    protected $contactDetails;

    /**
     * @ORM\Column(name="content_raw", type="text", nullable=true)
     */
    protected $contentRaw;

    public function getJobTitle()
    {
        return $this->jobTitle;
    }

    public function getEmployer()
    {
        return $this->employer;
    }

    public function getExtLink()
    {
        return $this->extLink;
    }

    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the value of createdTime.
     */
    public function getCreatedTime()
    {
        return $this->createdTime;
    }

    /**
     * Set the value of createdTime.
     *
     * @param mixed $createdTime
     *
     * @return self
     */
    public function setCreatedTime($createdTime)
    {
        $this->createdTime = $createdTime;

        return $this;
    }

    /**
     * Get the value of updatedTime.
     */
    public function getUpdatedTime()
    {
        return $this->updatedTime;
    }

    /**
     * Set the value of updatedTime.
     *
     * @param mixed $updatedTime
     *
     * @return self
     */
    public function setUpdatedTime($updatedTime)
    {
        $this->updatedTime = $updatedTime;

        return $this;
    }

    /**
     * Get the value of postedDate.
     */
    public function getPostedDate()
    {
        return $this->postedDate;
    }

    /**
     * Set the value of postedDate.
     *
     * @param mixed $postedDate
     *
     * @return self
     */
    public function setPostedDate($postedDate)
    {
        $this->postedDate = $postedDate;

        return $this;
    }

    /**
     * Get the value of deadlineDate.
     */
    public function getDeadlineDate()
    {
        return $this->deadlineDate;
    }

    /**
     * Set the value of deadlineDate.
     *
     * @param mixed $deadlineDate
     *
     * @return self
     */
    public function setDeadlineDate($deadlineDate)
    {
        $this->deadlineDate = $deadlineDate;

        return $this;
    }

    /**
     * Get the value of locationPostalCode.
     */
    public function getLocationPostalCode()
    {
        return $this->locationPostalCode;
    }

    /**
     * Set the value of locationPostalCode.
     *
     * @param mixed $locationPostalCode
     *
     * @return self
     */
    public function setLocationPostalCode($locationPostalCode)
    {
        $this->locationPostalCode = $locationPostalCode;

        return $this;
    }

    /**
     * Get the value of contactName.
     */
    public function getContactName()
    {
        return $this->contactName;
    }

    /**
     * Set the value of contactName.
     *
     * @param mixed $contactName
     *
     * @return self
     */
    public function setContactName($contactName)
    {
        $this->contactName = $contactName;

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
     * Get the value of contactDetails.
     */
    public function getContactDetails()
    {
        return $this->contactDetails;
    }

    /**
     * Set the value of contactDetails.
     *
     * @param mixed $contactDetails
     *
     * @return self
     */
    public function setContactDetails($contactDetails)
    {
        $this->contactDetails = $contactDetails;

        return $this;
    }

    /**
     * Get the value of contentRaw.
     */
    public function getContentRaw()
    {
        return $this->contentRaw;
    }

    /**
     * Set the value of contentRaw.
     *
     * @param mixed $contentRaw
     *
     * @return self
     */
    public function setContentRaw($contentRaw)
    {
        $this->contentRaw = $contentRaw;

        return $this;
    }

    /**
     * Get the value of locationCity
     */ 
    public function getLocationCity()
    {
        return $this->locationCity;
    }

    /**
     * Set the value of locationCity
     *
     * @return  self
     */ 
    public function setLocationCity($locationCity)
    {
        $this->locationCity = $locationCity;

        return $this;
    }

    /**
     * Set the value of jobTitle
     *
     * @return  self
     */ 
    public function setJobTitle($jobTitle)
    {
        $this->jobTitle = $jobTitle;

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
     * Set the value of extLink
     *
     * @return  self
     */ 
    public function setExtLink($extLink)
    {
        $this->extLink = $extLink;

        return $this;
    }

    public function toArray() {

        $output = [];

        foreach ( get_class_vars(get_class($this)) as $propName => $propDefaultValue ) {
            $output[ $propName ] = $this->{$propName};
        }

        return $output;

    }
}
