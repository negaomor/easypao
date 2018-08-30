/**
 * Represents the result of loading a list of external files using the "TemplateLoader" class.
 */
class TemplateLoaderResult {
    sucess: boolean;
    errorMessage: string;

    /**
     * Creates a new instance indicating success.
     */
    static Sucess(): TemplateLoaderResult {
        return <TemplateLoaderResult>{ sucess: true };
    }

    /**
     * Creates a new instance indicating failure.
     * @param errorMessage The error message.
     */
    static Fail(errorMessage: string): TemplateLoaderResult {
        return <TemplateLoaderResult>{ sucess: false, errorMessage: errorMessage };
    }
}

/**
 * Utility class to load Kendo templates from external files.
 */
class TemplateLoader {

    private static KENDO_TEMPLATES_ID: string = 'kendo-templates';

    private urls: string[];
    private selectedIndex: number;
    private selectedUrl: string;
    private content;

    /**
     * Loads templates from external files and append them into the DOM.
     * @param urls The list of URLs to load from.
     */
    load(urls: string[]): TemplateLoaderResult {
        this.urls = urls;
        this.selectedIndex = 0;
        this.content = '';

        var result: TemplateLoaderResult;

        if (urls.length > 0) {
            while (this.hasNextUrl()) {
                result = this.loadTemplate(this.getNextUrl());
            }
        }
        else {
            result = TemplateLoaderResult.Fail('No templates to load.');
        }

        if (result.sucess) {
            if ($('body #' + TemplateLoader.KENDO_TEMPLATES_ID).length == 0) {
                $('body').append($("<div>", { id: TemplateLoader.KENDO_TEMPLATES_ID }));
            }

            $('#' + TemplateLoader.KENDO_TEMPLATES_ID).append(this.content);
        }

        return result;
    }

    private loadTemplate(url: string): TemplateLoaderResult {
        var result: TemplateLoaderResult;

        if (!this.isTemplateAlreadyLoaded(url)) {
            $.ajax({
                url: url,
                async: false,
                type: 'get',
            })
                .done((data: string, textStatus: string, jqXHR: JQueryXHR) => { result = this.onLoadDone(data, textStatus, jqXHR); })
                .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => { result = this.onLoadFail(jqXHR, textStatus, errorThrown); });
        }
        else {
            result = TemplateLoaderResult.Sucess();
        }

        return result;
    }

    private onLoadDone(data: string, textStatus: string, jqXHR: JQueryXHR): TemplateLoaderResult {
        var templateName = this.getTemplateName(this.selectedUrl);

        this.content += '<!-- ' + templateName + ' --><div id="' + templateName + '" >' + jqXHR.responseText + '</div>';

        return TemplateLoaderResult.Sucess();
    }

    private onLoadFail(jqXHR: JQueryXHR, textStatus: string, errorThrown: string): TemplateLoaderResult {
        var message = 'Could not load template "' + this.selectedUrl + '". ' + errorThrown;

        return TemplateLoaderResult.Fail(message);
    }

    private hasNextUrl(): boolean {
        return this.selectedIndex < this.urls.length;
    }

    private getNextUrl(): string {
        this.selectedUrl = null;

        if (this.hasNextUrl()) {
            this.selectedUrl = this.urls[this.selectedIndex];
            this.selectedIndex++;
        }

        return this.selectedUrl;
    }

    private isTemplateAlreadyLoaded(url: string) {
        var templateName = this.getTemplateName(url);

        if ($(document.getElementById(templateName)).length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    private getTemplateName(url: string) {
        return url.split('/').pop();
    }
}
