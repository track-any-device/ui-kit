<?php

// database/migrations/xxxx_xx_xx_create_page_sections_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->boolean('published')->default(false);
            $table->timestamps();
        });

        Schema::create('page_sections', function (Blueprint $table) {
            $table->id();

            // Foreign key to the page this section belongs to.
            // Nullable so sections can also be attached to models other than pages
            // (e.g., products, solutions) via the polymorphic columns below.
            $table->foreignId('page_id')->nullable()->constrained()->cascadeOnDelete();

            // Polymorphic attachment — allows sections to be owned by any model.
            // Use EITHER page_id OR the poly columns, not both.
            $table->nullableMorphs('sectionable');

            // The section type key — must match a key in the React sectionRegistry.
            // e.g. "hero", "faq", "pricing", "testimonials"
            $table->string('type');

            // Optional CSS anchor / id="" for deep-linking.
            $table->string('identifier')->nullable();

            // JSON blob storing all the section content props.
            // The shape is defined by the matching TypeScript content type.
            $table->json('content')->default('{}');

            // Soft-toggle without deleting.
            $table->boolean('active')->default(true);

            // Display order within the page (lower = higher on page).
            $table->unsignedSmallInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index(['page_id', 'sort_order']);
            $table->index(['sectionable_type', 'sectionable_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_sections');
        Schema::dropIfExists('pages');
    }
};
