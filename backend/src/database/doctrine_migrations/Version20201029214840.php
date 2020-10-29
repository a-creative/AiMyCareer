<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201029214840 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE tasks ADD performed_in_id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE tasks ADD CONSTRAINT FK_50586597947B9CA5 FOREIGN KEY (performed_in_id) REFERENCES job_experiences (id)');
        $this->addSql('CREATE INDEX IDX_50586597947B9CA5 ON tasks (performed_in_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE tasks DROP FOREIGN KEY FK_50586597947B9CA5');
        $this->addSql('DROP INDEX IDX_50586597947B9CA5 ON tasks');
        $this->addSql('ALTER TABLE tasks DROP performed_in_id');
    }
}
