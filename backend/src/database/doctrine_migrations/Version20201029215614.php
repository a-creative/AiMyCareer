<?php

namespace Database\Migrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema as Schema;

class Version20201029215614 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE education ADD educated_user_id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE education ADD CONSTRAINT FK_DB0A5ED2C75DA3F7 FOREIGN KEY (educated_user_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_DB0A5ED2C75DA3F7 ON education (educated_user_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE education DROP FOREIGN KEY FK_DB0A5ED2C75DA3F7');
        $this->addSql('DROP INDEX IDX_DB0A5ED2C75DA3F7 ON education');
        $this->addSql('ALTER TABLE education DROP educated_user_id');
    }
}
