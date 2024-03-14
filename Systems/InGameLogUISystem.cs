using Colossal.UI.Binding;
using Game.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trejak.InGameLogViewer.Systems
{
    internal partial class InGameLogUISystem : UISystemBase
    {

        private ValueBinding<bool> m_LogPanelEnabled;
        private ValueBinding<string[]> m_LogFiles;
        private ValueBinding<string> m_LogFileSelected;

        protected override void OnCreate()
        {
            base.OnCreate();
            var filesDefault = new string[] { "abc", "def", "ghi", "jkl", "mno" };
            AddBinding(m_LogPanelEnabled = new ValueBinding<bool>("InGameLogViewer", "LogPanelEnabled", true));
            AddBinding(m_LogFiles = new ValueBinding<string[]>("InGameLogViewer", "LogFiles", filesDefault, new ArrayWriter<string>()));
            AddBinding(m_LogFileSelected = new ValueBinding<string>("InGameLogViewer", "LogFileSelected", ""));

            AddBinding(new TriggerBinding("InGameLogViewer", "LogPanelClosed", LogPanelClosed));
            AddBinding(new TriggerBinding("InGameLogViewer", "LogPanelToggled", LogPanelToggled));
            AddBinding(new TriggerBinding<string>("InGameLogViewer", "OpenLogFile", OpenLogFile));
        }

        private void OpenLogFile(string logFile)
        {            
            m_LogFileSelected.Update(logFile);
        }

        private void LogPanelClosed()
        {
            m_LogPanelEnabled.Update(false);
        }

        private void LogPanelToggled()
        {
            m_LogPanelEnabled.Update(!m_LogPanelEnabled.value);
        }

    }
}
