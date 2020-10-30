<?php

namespace App\Mappings;

use App\Entities\Testimonial;
use App\Entities\JobExperience;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

class TestimonialMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return Testimonial::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->increments('id');

        $builder->text('summaryHtml')->nullable();
        $builder->string('byName')->length(150)->nullable(false);
        $builder->string('contactPhoneNo')->length(20)->nullable();
        $builder->string('contactEmail')->length(150)->nullable();
        $builder->string('onLinkedInProfile')->length(150)->nullable();
        $builder->boolean('onPaper')->nullable();
        
        $builder->manyToOne(JobExperience::class, 'aboutJobExperience');
        
    }


}