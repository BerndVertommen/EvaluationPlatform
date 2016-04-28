using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformLogic.Pdf
{
    public static class HtmlStyleHelper
    {
        public static readonly string StyleForTable = @"<style> table {
                                      border: gray;
                                      border-width: medium;
                                      border-style: double;
                                      border-collapse: collapse;
                                    }
                                    th{
                                      border-width: thin;
                                      border-color: gray;
                                      border-style: solid;
                                    }
                                    tr {
                                      border-width: thin;
                                      border-color: gray;
                                      border-style: solid;
                                    }
                                     td {
                                      border-width: thin;
                                      border-color: gray;
                                      border-style: solid;
                                    }
</style>";
    }
}
