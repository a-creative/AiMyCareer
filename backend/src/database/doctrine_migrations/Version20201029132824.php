<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201029132824 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE job_experiences (id INT UNSIGNED AUTO_INCREMENT NOT NULL, owner_user_id INT UNSIGNED NOT NULL, job_title VARCHAR(150) DEFAULT NULL, employer VARCHAR(150) DEFAULT NULL, started_date DATE DEFAULT NULL, ended_date DATE DEFAULT NULL, INDEX IDX_E16E15392B18554A (owner_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE job_experiences ADD CONSTRAINT FK_E16E15392B18554A FOREIGN KEY (owner_user_id) REFERENCES users (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE job_experiences');
    }
}
