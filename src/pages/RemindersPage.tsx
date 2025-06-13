
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Calendar, Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import { Navigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Reminder {
  id: string;
  title: string;
  description: string | null;
  reminder_time: string;
  is_completed: boolean;
  created_at: string;
  user_id: string;
}

const RemindersPage = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
  });
  const { user, loading: authLoading } = useAuth();

  // Redirect to auth if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-purple-600"></div>
      </div>
    );
  }

  useEffect(() => {
    if (user) {
      console.log('User authenticated, fetching reminders for user:', user.id);
      fetchReminders();
    }
  }, [user]);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      console.log('Fetching reminders for user:', user?.id);
      
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reminders:', error);
        throw error;
      }
      
      console.log('Fetched reminders:', data);
      setReminders(data || []);
    } catch (error: any) {
      console.error('Error fetching reminders:', error);
      toast.error('Failed to load reminders: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async () => {
    if (!formData.title || !formData.date || !formData.time || !user) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      console.log('Creating reminder with data:', {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        user_id: user.id
      });

      // Combine date and time into a proper timestamp
      const reminderDateTime = new Date(`${formData.date}T${formData.time}`);
      console.log('Parsed datetime:', reminderDateTime);
      
      if (isNaN(reminderDateTime.getTime())) {
        throw new Error('Invalid date or time format');
      }

      const reminderData = {
        title: formData.title,
        description: formData.description || null,
        reminder_time: reminderDateTime.toISOString(),
        user_id: user.id,
        is_completed: false
      };

      console.log('Inserting reminder data:', reminderData);

      const { data, error } = await supabase
        .from('reminders')
        .insert(reminderData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Successfully created reminder:', data);
      setReminders(prev => [data, ...prev]);
      setFormData({ title: '', description: '', date: '', time: '' });
      setShowForm(false);
      toast.success('Reminder created successfully');
    } catch (error: any) {
      console.error('Error adding reminder:', error);
      
      // Provide specific error messages
      if (error?.message?.includes('row-level security')) {
        toast.error('Authentication error: Please try logging out and back in');
      } else if (error?.message?.includes('violates')) {
        toast.error('Permission denied: Unable to create reminder');
      } else {
        toast.error('Failed to create reminder: ' + (error?.message || 'Unknown error'));
      }
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      console.log('Deleting reminder:', id);
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error deleting reminder:', error);
        throw error;
      }

      setReminders(prev => prev.filter(reminder => reminder.id !== id));
      toast.success('Reminder deleted successfully');
    } catch (error: any) {
      console.error('Error deleting reminder:', error);
      toast.error('Failed to delete reminder: ' + (error?.message || 'Unknown error'));
    }
  };

  const toggleReminder = async (id: string, currentStatus: boolean) => {
    try {
      console.log('Toggling reminder:', id, 'from', currentStatus, 'to', !currentStatus);
      const { error } = await supabase
        .from('reminders')
        .update({ is_completed: !currentStatus })
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error updating reminder:', error);
        throw error;
      }

      setReminders(prev => prev.map(reminder => 
        reminder.id === id ? { ...reminder, is_completed: !currentStatus } : reminder
      ));
      
      toast.success(`Reminder ${!currentStatus ? 'completed' : 'marked as pending'}`);
    } catch (error: any) {
      console.error('Error updating reminder:', error);
      toast.error('Failed to update reminder: ' + (error?.message || 'Unknown error'));
    }
  };

  const formatDateTime = (reminderTime: string) => {
    const date = new Date(reminderTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl md:text-4xl font-bold text-purple-800 mb-2 font-serif"
          >
            ⏰ Smart Reminders
          </motion.h1>
          <p className="text-purple-600">Never miss an important deadline</p>
        </div>

        {/* Add Reminder Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-center"
        >
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
          >
            <Plus size={20} className="mr-2" />
            Create New Reminder
          </Button>
        </motion.div>

        {/* Add Reminder Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="shadow-xl border-purple-100">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Bell size={24} />
                    New Reminder
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Input
                    placeholder="Reminder title..."
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="border-purple-200 focus:border-purple-500"
                  />
                  <Textarea
                    placeholder="Description (optional)..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="border-purple-200 focus:border-purple-500"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="border-purple-200 focus:border-purple-500"
                    />
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={addReminder}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={!formData.title || !formData.date || !formData.time}
                    >
                      Create Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reminders List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-purple-600"></div>
            </div>
          ) : (
            <AnimatePresence>
              {reminders.map((reminder, index) => {
                const { date, time } = formatDateTime(reminder.reminder_time);
                return (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`shadow-lg transition-all duration-300 hover:shadow-xl ${
                      !reminder.is_completed ? 'bg-white border-purple-100' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <motion.div
                                animate={{ 
                                  scale: !reminder.is_completed ? [1, 1.2, 1] : 1,
                                  rotate: !reminder.is_completed ? [0, 15, -15, 0] : 0
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: !reminder.is_completed ? Infinity : 0,
                                  repeatDelay: 3 
                                }}
                              >
                                <Bell size={20} className={!reminder.is_completed ? 'text-amber-500' : 'text-gray-400'} />
                              </motion.div>
                              <h3 className={`text-lg font-semibold ${
                                !reminder.is_completed ? 'text-gray-800' : 'text-gray-500'
                              }`}>
                                {reminder.title}
                              </h3>
                              <Badge className={!reminder.is_completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                                {!reminder.is_completed ? 'Active' : 'Completed'}
                              </Badge>
                            </div>
                            {reminder.description && (
                              <p className="text-gray-600 mb-3">{reminder.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {time}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleReminder(reminder.id, reminder.is_completed)}
                              className="border-purple-200 text-purple-600 hover:bg-purple-50"
                            >
                              {reminder.is_completed ? 'Mark Pending' : 'Mark Complete'}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Reminder</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{reminder.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => deleteReminder(reminder.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {!loading && reminders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No reminders set</p>
            <p className="text-gray-400">Create your first reminder to get started</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RemindersPage;
