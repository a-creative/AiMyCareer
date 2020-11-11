<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201111192143 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE education ADD created_time DATETIME DEFAULT NULL, ADD updated_time DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE skill_categories ADD created_time DATETIME DEFAULT NULL, ADD updated_time DATETIME DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE education DROP created_time, DROP updated_time');
        $this->addSql('ALTER TABLE skill_categories DROP created_time, DROP updated_time');
    }
}
