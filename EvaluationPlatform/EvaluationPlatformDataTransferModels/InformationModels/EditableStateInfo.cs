using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class EditableStateInfo
    {
        public ICollection<EditChangeHistoryRecordInfo> EditChangeHistoryRecords { get; private set; } = new List<EditChangeHistoryRecordInfo>();
        public bool CanEdit { get; set; }

        public EditableStateInfo()
        {
            
        }
    }
}
