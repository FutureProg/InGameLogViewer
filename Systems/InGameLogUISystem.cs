using Colossal.Logging;
using Colossal.UI.Binding;
using Game.Prefabs;
using Game.UI;
using System;
using System.Collections.Generic;
using System.IO;
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
        private ValueBinding<string> m_LogContent;

        private FileSystemWatcher logFolderWatcher;
        private FileSystemWatcher fileContentWatcher;


        protected override void OnCreate()
        {
            base.OnCreate();

            logFolderWatcher = new FileSystemWatcher(LogManager.kDefaultLogPath, "*.log");
            logFolderWatcher.NotifyFilter = NotifyFilters.FileName;
            logFolderWatcher.Created += OnLogFileCreated;
            logFolderWatcher.Deleted += OnLogFileDeleted;
            logFolderWatcher.Renamed += OnLogFileRenamed;               

            fileContentWatcher = new FileSystemWatcher(LogManager.kDefaultLogPath, "Player.log");
            fileContentWatcher.NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.Size;
            fileContentWatcher.Changed += OnLogFileChanged;


            var filesDefault = new string[] { "abc", "def", "ghi", "jkl", "mno" };
            AddBinding(m_LogPanelEnabled = new ValueBinding<bool>("Trejak.InGameLogViewer", "LogPanelEnabled", true));
            AddBinding(m_LogFiles = new ValueBinding<string[]>("Trejak.InGameLogViewer", "LogFiles", GetLogFileNames(), new ArrayWriter<string>()));
            AddBinding(m_LogFileSelected = new ValueBinding<string>("Trejak.InGameLogViewer", "LogFileSelected", ""));
            AddBinding(m_LogContent = new ValueBinding<string>("Trejak.InGameLogViewer", "LogContent", ""));

            AddBinding(new TriggerBinding("Trejak.InGameLogViewer", "LogPanelClosed", LogPanelClosed));
            AddBinding(new TriggerBinding("Trejak.InGameLogViewer", "LogPanelToggled", LogPanelToggled));
            AddBinding(new TriggerBinding<string>("Trejak.InGameLogViewer", "OpenLogFile", OpenLogFile));
            
        }

        private string[] GetLogFileNames()
        {
            var filePaths = Directory.GetFiles(LogManager.kDefaultLogPath, "*.log", SearchOption.TopDirectoryOnly);
            string[] re = new string[filePaths.Length];
            for(var i = 0; i < re.Length; i++)
            {
                re[i] = Path.GetFileName(filePaths[i]);
            }
            return re;
        }

        private string GetLogFileContent(string fileName)
        {
            string re = File.ReadAllText(fileName);
            return re;
        }

        private void UpdateLogFileList()
        {
            m_LogFiles.Update(GetLogFileNames());
        }

        private void OnLogFileCreated(object sender, FileSystemEventArgs evt)
        {
            UpdateLogFileList();
        }

        private void OnLogFileDeleted(object sender, FileSystemEventArgs evt)
        {            
            if (evt.Name == m_LogFileSelected.value)
            {
                OpenLogFile("Player.log");
            }
            UpdateLogFileList();
        }

        private void OnLogFileRenamed(object sender, RenamedEventArgs evt)
        {
            UpdateLogFileList();
            if (evt.OldName == m_LogFileSelected.value)
            {                
                OpenLogFile(evt.Name);
            }
        }

        private void OnLogFileChanged(object sender, FileSystemEventArgs evt)
        {
            // Only for the fileContentWatcher
            if (evt.ChangeType != WatcherChangeTypes.Changed)
            {
                return;
            }
            if (evt.Name == m_LogFileSelected.value)
            {
                UpdateLogFileContent(m_LogFileSelected.value);
            }            
        }

        private void UpdateLogFileContent(string logFile)
        {
            string content = GetLogFileContent(logFile);
            m_LogContent.Update(content);
        }

        private void OpenLogFile(string logFile)
        {            
            m_LogFileSelected.Update(logFile);
            fileContentWatcher.Filter = logFile;
            UpdateLogFileContent(logFile);
        }

        private void LogPanelClosed()
        {
            m_LogPanelEnabled.Update(false);
        }

        private void LogPanelToggled()
        {
            m_LogPanelEnabled.Update(!m_LogPanelEnabled.value);
        }

        protected override void OnDestroy()
        {
            base.OnDestroy();
            logFolderWatcher.Dispose();
            fileContentWatcher.Dispose();
        }

    }
}
