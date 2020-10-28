<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201028212336 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE job_postings ADD owner_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE job_postings ADD CONSTRAINT FK_B5F86DAB2B18554A FOREIGN KEY (owner_user_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_B5F86DAB2B18554A ON job_postings (owner_user_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE job_postings DROP FOREIGN KEY FK_B5F86DAB2B18554A');
        $this->addSql('DROP INDEX IDX_B5F86DAB2B18554A ON job_postings');
        $this->addSql('ALTER TABLE job_postings DROP owner_user_id');
    }
}
