<?php

namespace App\Mappings;

use App\Entities\Skill;
use App\Entities\Education;
use App\Entities\User;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

/*

Class Skill
    name: string[150]
    explainer: text
    category: SkillCategory
    type: 0 = Tool, 1 = Personal(internal), 2 = Personal(external), 3 = Language, 4 = Other

Class EducationExpSkill
    learnedSkill: Skill
    learnedAtEducation: Education
    learningWeight: integer
    startedDate: date
    endedDate: date

*/

class EducationMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return Education::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->increments('id');

        $builder->string('name')->length(150)->nullable(false);
        $builder->text('description')->nullable();
        $builder->date('startedDate')->nullable(false);
        $builder->date('endedDate')->nullable(false);

        $builder->datetime('createdTime')->nullable();
        $builder->datetime('updatedTime')->nullable();

        $builder->manyToOne(User::class, 'educatedUser');

    
    }


}