<?php

namespace App\Entities;

use Doctrine\ORM\Mapping AS ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="job_postings")
 */
class JobPosting {

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $job_title;

    /**
     * @ORM\Column(type="string")
     */
    protected $employer;

    /**
     * @ORM\Column(type="string")
     */
    protected $ext_link;

    public function getJobTitle() {
        return $this->job_title;
    }

    public function getEmployer() {
        return $this->employer;
    }

    public function getExtLink() {
        return $this->ext_link;
    }

    public function getId() {
        return $this->id;
    }


}
