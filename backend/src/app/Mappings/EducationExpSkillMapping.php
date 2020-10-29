<?php

namespace App\Mappings;

use App\Entities\Skill;
use App\Entities\Education;
use App\Entities\EducationExpSkill;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

class EducationExpSkillMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return EducationExpSkill::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->primary(['learnedSkill', 'learnedAtEducation']);

        $builder->unsignedSmallInteger('learningWeightPct')->nullable(false);
        $builder->date('startedDate')->nullable();
        $builder->date('endedDate')->nullable();

        $builder->manyToOne(Skill::class, 'learnedSkill');
        $builder->manyToOne(Education::class, 'learnedAtEducation');
    
    }


}