<?php

namespace ScaffolderTheme;

use Scaffolder\Support\Contracts\ScaffolderThemeLayoutsInterface;

class MaterialThemeLayouts implements ScaffolderThemeLayoutsInterface
{
    const EXT = '.blade.php';

    private $layoutsDirectory;

    public function __construct()
    {
        $this->layoutsDirectory = __DIR__ . '/../../resources/layouts/';
    }

    public function getCreatePath()
    {
        return realpath($this->layoutsDirectory . 'create' . self::EXT);
    }

    public function getEditPath()
    {
        return realpath($this->layoutsDirectory . 'edit' . self::EXT);
    }

    public function getPagePath()
    {
        return realpath($this->layoutsDirectory . 'page' . self::EXT);
    }
}
