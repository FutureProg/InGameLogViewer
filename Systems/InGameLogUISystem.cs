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

        protected override void OnCreate()
        {
            base.OnCreate();
            AddBinding(m_LogPanelEnabled = new ValueBinding<bool>("InGameLogViewer", "LogPanelEnabled", true));
            AddBinding(new TriggerBinding("InGameLogViewer", "LogPanelClosed", LogPanelClosed));
            AddBinding(new TriggerBinding("InGameLogViewer", "LogPanelToggled", LogPanelToggled));
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
