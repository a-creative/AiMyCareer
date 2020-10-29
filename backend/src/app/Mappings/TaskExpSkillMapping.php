<?php

namespace App\Mappings;

use App\Entities\Skill;
use App\Entities\Task;
use App\Entities\TaskExpSkill;
use LaravelDoctrine\Fluent\EntityMapping;
use LaravelDoctrine\Fluent\Fluent;

class TaskExpSkillMapping extends EntityMapping
{
    /**
     * Returns the fully qualified name of the class that this mapper maps.
     *
     * @return string
     */
    public function mapFor()
    {
        return TaskExpSkill::class;
    }

    /**
     * Load the object's metadata through the Metadata Builder object.
     *
     * @param Fluent $builder
     */
    public function map(Fluent $builder)
    {
        $builder->primary(['usedSkill','usedWithTask']);
        $builder->unsignedSmallInteger('usageWeightPct')->nullable(false);

        $builder->manyToOne(Skill::class, 'usedSkill');
        $builder->manyToOne(Task::class, 'usedWithTask');
    
    }


}